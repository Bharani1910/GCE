const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sendResetMail = require('./mailer');

// Mock User Database seeded with institutional master data
const users = [
    { name: 'Bharani E K', email: 'bharaniii535@gmail.com', password: 'Password123' },
    { name: 'Darsini B', email: 'darsini132006@gmail.com', password: 'Password123' },
    { name: 'Kaviya S', email: 'kaviyas122004@gmail.com', password: 'Password123' },
    { name: 'Saradha A', email: 'nithyaa16042005@gmail.com', password: 'Password123' },
    { name: 'Test User', email: 'test@example.com', password: 'Password123' },
    { name: 'Student 1', email: '23cse01@gceerode.edu.in', password: 'Password123' },
    { name: 'Student 2', email: '25cse01@gceerode.edu.in', password: 'Password123' }
];

// Mock Notification Database
const notifications = [];
const acknowledgments = [];

// STEP 2: FORGOT PASSWORD -> SEND OTP
// Endpoint: POST /api/auth/forgot-password
router.post('/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log(`[Backend] Forgot Password request for: ${email}`);

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Validate email exists (MANDATORY)
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            console.warn(`[Backend] Reset failed: User ${email} not found in database.`);
            return res.status(404).json({ message: 'User not found in institutional records.' });
        }

        // Generate 6-digit numeric OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP using bcrypt (MANDATORY)
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Save: resetOtp, resetOtpExpiry (5 minutes)
        user.resetOtp = hashedOtp;
        user.resetOtpExpiry = Date.now() + 5 * 60 * 1000;

        // Send email using Nodemailer
        await sendResetMail(email, otp, true);

        res.status(200).json({
            message: 'Verification code sent to your email'
        });
    } catch (error) {
        console.error('Error in forgot-password:', error);
        res.status(500).json({ message: 'Failed to send verification code' });
    }
});

// STEP 3: VERIFY OTP
// Endpoint: POST /api/auth/verify-otp
router.post('/auth/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    console.log(`[Backend] Verify OTP request for: ${email}`);

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and verification code are required' });
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || !user.resetOtp || !user.resetOtpExpiry) {
        return res.status(400).json({ message: 'No verification session found' });
    }

    if (Date.now() > user.resetOtpExpiry) {
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;
        return res.status(400).json({ message: 'Verification code has expired' });
    }

    // Compare OTP using bcrypt (MANDATORY)
    const isValid = await bcrypt.compare(otp, user.resetOtp);
    if (!isValid) {
        return res.status(400).json({ message: 'Invalid verification code' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
});

// STEP 4: SET NEW PASSWORD
// Endpoint: POST /api/auth/reset-password
router.post('/auth/reset-password', async (req, res) => {
    const { email, otp, newPassword, confirmPassword } = req.body;
    console.log(`[Backend] Final Reset request for: ${email}`);

    if (!email || !otp || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Mandatory Backend Validations
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ message: 'Password does not meet security requirements.' });
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || !user.resetOtp) {
        return res.status(400).json({ message: 'Invalid or expired session' });
    }

    // Ensure OTP verification is still valid logic
    const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
    if (!isOtpValid || Date.now() > user.resetOtpExpiry) {
        return res.status(400).json({ message: 'Verification session expired. Please restart.' });
    }

    try {
        // Hash password using bcrypt (MANDATORY)
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // CLEAR resetOtp, resetOtpExpiry
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;

        res.status(200).json({ message: 'Password reset successful. Please login.' });
    } catch (error) {
        console.error('Error reset-password:', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
});

// Helper for signup to test simulation flow
router.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(`[Backend] Signup request for: ${email}`);

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ message: 'User already exists in backend records' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ email: email.toLowerCase(), password: hashedPassword });
        console.log(`[Backend] Successfully registered: ${email}`);
        res.status(201).json({ message: 'User created in backend database' });
    } catch (err) {
        res.status(500).json({ message: 'Internal signup error' });
    }
});

router.post('/validate-password', (req, res) => {
    const { password } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be 8+ characters and contain uppercase, lowercase, number, and special character (@$!%*?&).'
        });
    }
    res.status(200).json({ valid: true });
});

// ============================================
// NOTIFICATION SYSTEM ENDPOINTS
// ============================================

// GET unread count for logged-in user
router.get('/notifications/unread-count', (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    // Count notifications where user is receiver and isRead = false
    const unreadCount = notifications.filter(n => {
        // Check if user is a target receiver
        const isReceiver = n.receiverIds && n.receiverIds.includes(userId);

        // Check if already read by this user
        const ack = acknowledgments.find(a =>
            a.notificationId === n.id &&
            a.userId === userId
        );

        const isRead = ack && ack.isRead;

        return isReceiver && !isRead && n.senderId !== userId;
    }).length;

    res.status(200).json({ unreadCount });
});

// GET new notifications count since last login
router.get('/notifications/new-since-login', (req, res) => {
    const { userId, lastLoginTime } = req.query;

    if (!userId || !lastLoginTime) {
        return res.status(400).json({ message: 'userId and lastLoginTime are required' });
    }

    const loginTimestamp = parseInt(lastLoginTime);

    // Count notifications created after last login that user hasn't read
    const newCount = notifications.filter(n => {
        // Check if notification was created after last login
        const isNew = n.createdAt > loginTimestamp;

        // Check if user is a target receiver
        const isReceiver = n.receiverIds && n.receiverIds.includes(userId);

        // Exclude sender's own notifications
        const notSender = n.senderId !== userId;

        return isNew && isReceiver && notSender;
    }).length;

    res.status(200).json({ newCount });
});

// GET all notifications for user
router.get('/notifications', (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    // Filter notifications for this user
    const userNotifications = notifications.filter(n => {
        return n.receiverIds && n.receiverIds.includes(userId);
    });

    // Attach read status
    const enriched = userNotifications.map(n => {
        const ack = acknowledgments.find(a =>
            a.notificationId === n.id && a.userId === userId
        );

        return {
            ...n,
            isRead: ack ? ack.isRead : false,
            isAcknowledged: ack ? ack.isAcknowledged : false
        };
    });

    res.status(200).json({ notifications: enriched });
});

// POST mark notifications as read
router.post('/notifications/mark-read', (req, res) => {
    const { userId, notificationIds } = req.body;

    if (!userId || !notificationIds || !Array.isArray(notificationIds)) {
        return res.status(400).json({ message: 'userId and notificationIds array required' });
    }

    notificationIds.forEach(notifId => {
        const existing = acknowledgments.find(a =>
            a.notificationId === notifId && a.userId === userId
        );

        if (existing) {
            existing.isRead = true;
            existing.isDelivered = true;
        } else {
            acknowledgments.push({
                id: Math.random().toString(36).substr(2, 9),
                notificationId: notifId,
                userId,
                isDelivered: true,
                isRead: true,
                isAcknowledged: false,
                timestamp: Date.now()
            });
        }
    });

    res.status(200).json({ message: 'Marked as read', count: notificationIds.length });
});

// POST create notification (for testing)
router.post('/notifications/create', (req, res) => {
    const { senderId, receiverIds, title, content, category, priority } = req.body;

    const newNotification = {
        id: Math.random().toString(36).substr(2, 9),
        senderId,
        receiverIds: receiverIds || [],
        title,
        content,
        category: category || 'GENERAL',
        priority: priority || 'NORMAL',
        createdAt: Date.now()
    };

    notifications.push(newNotification);

    // Auto-mark sender as read
    acknowledgments.push({
        id: Math.random().toString(36).substr(2, 9),
        notificationId: newNotification.id,
        userId: senderId,
        isDelivered: true,
        isRead: true,
        isAcknowledged: false,
        timestamp: Date.now()
    });

    res.status(201).json({ message: 'Notification created', notification: newNotification });
});

module.exports = router;

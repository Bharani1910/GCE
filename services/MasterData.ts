
import { Department, UserRole } from '../types';

export interface MasterUser {
  name: string;
  email: string;
  role: UserRole;
  department: Department;
  rollNumber?: string;
  year?: number;
  phoneNumber: string;
  // Adding isPrincipal to support Principal account identification in master data
  isPrincipal?: boolean;
}

// COMPLETE INSTITUTIONAL DATABASE (Extracted from PDF source)
// Phone numbers normalized for system verification as per instructions
export const MASTER_USERS: MasterUser[] = [
  // --- COMPUTER SCIENCE AND ENGINEERING ---
  { name: 'Elakiya S', email: '25cse01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '25CSE01', year: 1, phoneNumber: '1200000001' },
  { name: 'Dhanush K', email: '25cse02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '25CSE02', year: 1, phoneNumber: '1200000002' },
  { name: 'Gopi M', email: '25cse03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '25CSE03', year: 1, phoneNumber: '1200000003' },
  { name: 'Syed S', email: '25cse04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '25CSE04', year: 1, phoneNumber: '1200000004' },
  { name: 'Pragathi V', email: '25cse05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '25CSE05', year: 1, phoneNumber: '1200000005' },
  { name: 'Abdul V', email: '24cse01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '24CSE01', year: 2, phoneNumber: '1200000006' },
  { name: 'Keerthana B', email: '24cse02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '24CSE02', year: 2, phoneNumber: '1200000007' },
  { name: 'Kishore A', email: '24cse03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '24CSE03', year: 2, phoneNumber: '1200000008' },
  { name: 'Mani R', email: '24cse04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '24CSE04', year: 2, phoneNumber: '1200000009' },
  { name: 'Venkat S', email: '24cse05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '24CSE05', year: 2, phoneNumber: '1200000010' },
  { name: 'Bharani E K', email: 'bharaniii535@gmail.com', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '23CSE01', year: 3, phoneNumber: '1234567890' },
  { name: 'Darsini B', email: 'darsini132006@gmail.com', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '23CSE02', year: 3, phoneNumber: '1200000012' },
  { name: 'Kaviya S', email: 'kaviyas122004@gmail.com', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '23CSE03', year: 3, phoneNumber: '1200000013' },
  { name: 'Priya D', email: '23cse04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '23CSE04', year: 3, phoneNumber: '1200000014' },
  { name: 'Sambavi A', email: '23cse05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '23CSE05', year: 3, phoneNumber: '1200000015' },
  { name: 'Afrin B', email: '22cse01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '22CSE01', year: 4, phoneNumber: '1200000016' },
  { name: 'Dharani V', email: '22cse02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '22CSE02', year: 4, phoneNumber: '1200000017' },
  { name: 'Dharsha M', email: '22cse03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '22CSE03', year: 4, phoneNumber: '1200000018' },
  { name: 'Kanishkar V', email: '22cse04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '22CSE04', year: 4, phoneNumber: '1200000019' },
  { name: 'Umer K', email: '22cse05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CSE, rollNumber: '22CSE05', year: 4, phoneNumber: '1200000020' },

  // --- ELECTRONICS AND COMMUNICATION ENGINEERING ---
  { name: 'Anitha A', email: '25ece01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '25ECE01', year: 1, phoneNumber: '1200000021' },
  { name: 'Balaji V', email: '25ece02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '25ECE02', year: 1, phoneNumber: '1200000022' },
  { name: 'Dhanush M', email: '25ece03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '25ECE03', year: 1, phoneNumber: '1200000023' },
  { name: 'Fathima A', email: '25ece04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '25ECE04', year: 1, phoneNumber: '1200000024' },
  { name: 'Hari G', email: '25ece05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '25ECE05', year: 1, phoneNumber: '1200000025' },
  { name: 'Akshaya V', email: '24ece01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '24ECE01', year: 2, phoneNumber: '1200000026' },
  { name: 'Bhindhu K', email: '24ece02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '24ECE02', year: 2, phoneNumber: '1200000027' },
  { name: 'Nandhini V', email: '24ece03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '24ECE03', year: 2, phoneNumber: '1200000028' },
  { name: 'Praveen D', email: '24ece04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '24ECE04', year: 2, phoneNumber: '1200000029' },
  { name: 'Yuvaraj C', email: '24ece05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '24ECE05', year: 2, phoneNumber: '1200000030' },
  { name: 'Dharshini A', email: '23ece01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '23ECE01', year: 3, phoneNumber: '1200000031' },
  { name: 'Dhinoshini V', email: '23ece02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '23ECE02', year: 3, phoneNumber: '1200000032' },
  { name: 'Krithik N', email: '23ece03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '23ECE03', year: 3, phoneNumber: '1200000033' },
  { name: 'Nithish A', email: '23ece04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '23ECE04', year: 3, phoneNumber: '1200000034' },
  { name: 'Suba C', email: '23ece05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '23ECE05', year: 3, phoneNumber: '1200000035' },
  { name: 'Gayathri S', email: '22ece01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '22ECE01', year: 4, phoneNumber: '1200000036' },
  { name: 'Hema V', email: '22ece02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '22ECE02', year: 4, phoneNumber: '1200000037' },
  { name: 'Pavithra M', email: '22ece03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '22ECE03', year: 4, phoneNumber: '1200000038' },
  { name: 'Ramana A', email: '22ece04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '22ECE04', year: 4, phoneNumber: '1200000039' },
  { name: 'Vinothini V', email: '22ece05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.ECE, rollNumber: '22ECE05', year: 4, phoneNumber: '1200000040' },

  // --- ELECTRICAL AND ELECTRONICS ENGINEERING ---
  { name: 'Apsara V', email: '25eee01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '25EEE01', year: 1, phoneNumber: '1200000041' },
  { name: 'Kanimozhi A', email: '25eee02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '25EEE02', year: 1, phoneNumber: '1200000042' },
  { name: 'Prem N', email: '25eee03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '25EEE03', year: 1, phoneNumber: '1200000043' },
  { name: 'Ramya A', email: '25eee04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '25EEE04', year: 1, phoneNumber: '1200000044' },
  { name: 'Vinoth V', email: '25eee05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '25EEE05', year: 1, phoneNumber: '1200000045' },
  { name: 'Ajay A', email: '24eee01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '24EEE01', year: 2, phoneNumber: '1200000046' },
  { name: 'Magathi C', email: '24eee02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '24EEE02', year: 2, phoneNumber: '1200000047' },
  { name: 'Madhavan M', email: '24eee03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '24EEE03', year: 2, phoneNumber: '1200000048' },
  { name: 'Pradheep V', email: '24eee04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '24EEE04', year: 2, phoneNumber: '1200000049' },
  { name: 'Vasanth S', email: '24eee05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '24EEE05', year: 2, phoneNumber: '1200000050' },
  { name: 'Ajith A', email: '23eee01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '23EEE01', year: 3, phoneNumber: '1200000051' },
  { name: 'Bavithra C', email: '23eee02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '23EEE02', year: 3, phoneNumber: '1200000052' },
  { name: 'Karthi K', email: '23eee03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '23EEE03', year: 3, phoneNumber: '1200000053' },
  { name: 'Krithiga M', email: '23eee04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '23EEE03', year: 3, phoneNumber: '1200000053' },
  { name: 'Krithiga M', email: '23eee04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '23EEE04', year: 3, phoneNumber: '1200000054' },
  { name: 'Vaishnav A', email: '23eee05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '23EEE05', year: 3, phoneNumber: '1200000055' },
  { name: 'Amith V', email: '22eee01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '22EEE01', year: 4, phoneNumber: '1200000056' },
  { name: 'Hemanth M', email: '22eee02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '22EEE02', year: 4, phoneNumber: '1200000057' },
  { name: 'Mohan S', email: '22eee03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '22EEE03', year: 4, phoneNumber: '1200000058' },
  { name: 'Poojitha D', email: '22eee04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '22EEE04', year: 4, phoneNumber: '1200000059' },
  { name: 'Ram V', email: '22eee05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.EEE, rollNumber: '22EEE05', year: 4, phoneNumber: '1200000060' },

  // --- INFORMATION TECHNOLOGY ---
  { name: 'Amisha V', email: '25imt01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '25IMT01', year: 1, phoneNumber: '1200000061' },
  { name: 'Harshini B', email: '25imt02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '25IMT02', year: 1, phoneNumber: '1200000062' },
  { name: 'Harini V', email: '25imt03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '25IMT03', year: 1, phoneNumber: '1200000063' },
  { name: 'Ramesh M', email: '25imt04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '25IMT04', year: 1, phoneNumber: '1200000064' },
  { name: 'Suresh D', email: '25imt05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '25IMT05', year: 1, phoneNumber: '1200000065' },
  { name: 'Gopinath V', email: '24imt01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '24IMT01', year: 2, phoneNumber: '1200000066' },
  { name: 'Jai D', email: '24imt02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '24IMT02', year: 2, phoneNumber: '1200000067' },
  { name: 'Janani H', email: '24imt03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '24IMT03', year: 2, phoneNumber: '1200000068' },
  { name: 'Prema T', email: '24imt04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '24IMT04', year: 2, phoneNumber: '1200000069' },
  { name: 'Tharun C', email: '24imt05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '24IMT05', year: 2, phoneNumber: '1200000070' },
  { name: 'Abi S', email: '23imt01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '23IMT01', year: 3, phoneNumber: '1200000071' },
  { name: 'Joshika A', email: '23imt02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '23IMT02', year: 3, phoneNumber: '1200000072' },
  { name: 'Dinesh V', email: '23imt03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '23IMT03', year: 3, phoneNumber: '1200000073' },
  { name: 'Saran S', email: '23imt04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '23IMT04', year: 3, phoneNumber: '1200000074' },
  { name: 'Yuthika B', email: '23imt05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '23IMT05', year: 3, phoneNumber: '1200000075' },
  { name: 'Jagadeesh C', email: '22imt01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '22IMT01', year: 4, phoneNumber: '1200000076' },
  { name: 'Jayaram M', email: '22imt02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '22IMT02', year: 4, phoneNumber: '1200000077' },
  { name: 'Madhu C', email: '22imt03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '22IMT03', year: 4, phoneNumber: '1200000078' },
  { name: 'Sathya V', email: '22imt04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '22IMT04', year: 4, phoneNumber: '1200000079' },
  { name: 'Yamini M', email: '22imt05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.IT, rollNumber: '22IMT05', year: 4, phoneNumber: '1200000080' },

  // --- AUTOMOBILE ENGINEERING ---
  { name: 'Dhaya C', email: '25ate01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '25ATE01', year: 1, phoneNumber: '1200000081' },
  { name: 'Elangovan V', email: '25ate02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '25ATE02', year: 1, phoneNumber: '1200000082' },
  { name: 'Madhumitha V', email: '25ate03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '25ATE03', year: 1, phoneNumber: '1200000083' },
  { name: 'Nancy A', email: '25ate04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '25ATE04', year: 1, phoneNumber: '1200000084' },
  { name: 'Rajesh V', email: '25ate05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '25ATE05', year: 1, phoneNumber: '1200000085' },
  { name: 'Anu S', email: '24ate01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '24ATE01', year: 2, phoneNumber: '1200000086' },
  { name: 'Gokul M', email: '24ate02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '24ATE02', year: 2, phoneNumber: '1200000087' },
  { name: 'Meena M', email: '24ate03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '24ATE03', year: 2, phoneNumber: '1200000088' },
  { name: 'Swathi M', email: '24ate04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '24ATE04', year: 2, phoneNumber: '1200000089' },
  { name: 'Prakash V', email: '24ate05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '24ATE05', year: 2, phoneNumber: '1200000090' },
  { name: 'Arjun N', email: '23ate01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '23ATE01', year: 3, phoneNumber: '1200000091' },
  { name: 'Geetha V', email: '23ate02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '23ATE02', year: 3, phoneNumber: '1200000092' },
  { name: 'Mohana C', email: '23ate03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '23ATE03', year: 3, phoneNumber: '1200000093' },
  { name: 'Sangeetha V', email: '23ate04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '23ATE04', year: 3, phoneNumber: '1200000094' },
  { name: 'Prasanth M', email: '23ate05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '23ATE05', year: 3, phoneNumber: '1200000095' },
  { name: 'Aishwariya C', email: '22ate01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '22ATE01', year: 4, phoneNumber: '1200000096' },
  { name: 'Gowtham A', email: '22ate02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '22ATE02', year: 4, phoneNumber: '1200000097' },
  { name: 'Mahalakshmi M', email: '22ate03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '22ATE03', year: 4, phoneNumber: '1200000098' },
  { name: 'Sandhiya M', email: '22ate04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '22ATE04', year: 4, phoneNumber: '1200000099' },
  { name: 'Pranav M', email: '22ate05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.AUTO, rollNumber: '22ATE05', year: 4, phoneNumber: '1200000100' },

  // --- MECHANICAL ENGINEERING ---
  { name: 'Ashwin B', email: '25mech01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '25MECH01', year: 1, phoneNumber: '1200000101' },
  { name: 'Gopal A', email: '25mech02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '25MECH02', year: 1, phoneNumber: '1200000102' },
  { name: 'Mithra V', email: '25mech03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '25MECH03', year: 1, phoneNumber: '1200000103' },
  { name: 'Prithvi M', email: '25mech04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '25MECH04', year: 1, phoneNumber: '1200000104' },
  { name: 'Shalini S', email: '25mech05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '25MECH05', year: 1, phoneNumber: '1200000105' },
  { name: 'Amritha M', email: '24mech01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '24MECH01', year: 2, phoneNumber: '1200000106' },
  { name: 'Guru D', email: '24mech02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '24MECH02', year: 2, phoneNumber: '1200000107' },
  { name: 'Manisha M', email: '24mech03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '24MECH03', year: 2, phoneNumber: '1200000108' },
  { name: 'Sujatha M', email: '24mech04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '24MECH04', year: 2, phoneNumber: '1200000109' },
  { name: 'Palani V', email: '24mech05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '24MECH05', year: 2, phoneNumber: '1200000110' },
  { name: 'Adithya V', email: '23mech01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '23MECH01', year: 3, phoneNumber: '1200000111' },
  { name: 'Ganga A', email: '23mech02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '23MECH02', year: 3, phoneNumber: '1200000112' },
  { name: 'Monisha C', email: '23mech03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '23MECH03', year: 3, phoneNumber: '1200000113' },
  { name: 'Sridevi R', email: '23mech04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '23MECH04', year: 3, phoneNumber: '1200000114' },
  { name: 'Pugazh B', email: '23mech05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '23MECH05', year: 3, phoneNumber: '1200000115' },
  { name: 'Ananya C', email: '22mech01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '22MECH01', year: 4, phoneNumber: '1200000116' },
  { name: 'Ganesh C', email: '22mech02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '22MECH02', year: 4, phoneNumber: '1200000117' },
  { name: 'Meera V', email: '22mech03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '22MECH03', year: 4, phoneNumber: '1200000118' },
  { name: 'Shindhu M', email: '22mech04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '22MECH04', year: 4, phoneNumber: '1200000119' },
  { name: 'Parthiban N', email: '22mech05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.MECH, rollNumber: '22MECH05', year: 4, phoneNumber: '1200000120' },

  // --- CIVIL ENGINEERING ---
  { name: 'Arul V', email: '25civil01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '25CIVIL01', year: 1, phoneNumber: '1200000121' },
  { name: 'Gokul M', email: '25civil02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '25CIVIL02', year: 1, phoneNumber: '1200000122' },
  { name: 'Malathi V', email: '25civil03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '25CIVIL03', year: 1, phoneNumber: '1200000123' },
  { name: 'Shruthi V', email: '25civil04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '25CIVIL04', year: 1, phoneNumber: '1200000124' },
  { name: 'Pandian S', email: '25civil05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '25CIVIL05', year: 1, phoneNumber: '1200000125' },
  { name: 'Aarav S', email: '24civil01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '24CIVIL01', year: 2, phoneNumber: '1200000126' },
  { name: 'Govindh M', email: '24civil02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '24CIVIL02', year: 2, phoneNumber: '1200000127' },
  { name: 'Malar C', email: '24civil03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '24CIVIL03', year: 2, phoneNumber: '1200000128' },
  { name: 'Sushmitha C', email: '24civil04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '24CIVIL04', year: 2, phoneNumber: '1200000129' },
  { name: 'Pavun kumar A', email: '24civil05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '24CIVIL05', year: 2, phoneNumber: '1200000130' },
  { name: 'Abinaya V', email: '23civil01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '23CIVIL01', year: 3, phoneNumber: '1200000131' },
  { name: 'Giri A', email: '23civil02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '23CIVIL02', year: 3, phoneNumber: '1200000132' },
  { name: 'Mahima M', email: '23civil03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '23CIVIL03', year: 3, phoneNumber: '1200000133' },
  { name: 'Snega S', email: '23civil04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '23CIVIL04', year: 3, phoneNumber: '1200000134' },
  { name: 'Prabhu M', email: '23civil05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '23CIVIL05', year: 3, phoneNumber: '1200000135' },
  { name: 'Aravind C', email: '22civil01@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '22CIVIL01', year: 4, phoneNumber: '1200000136' },
  { name: 'Ganesan M', email: '22civil02@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '22CIVIL02', year: 4, phoneNumber: '1200000137' },
  { name: 'Mounika S', email: '22civil03@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '22CIVIL03', year: 4, phoneNumber: '1200000138' },
  { name: 'Sharmila V', email: '22civil04@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '22CIVIL04', year: 4, phoneNumber: '1200000139' },
  { name: 'Prakashan C', email: '22civil05@gceerode.edu.in', role: UserRole.STUDENT, department: Department.CIVIL, rollNumber: '22CIVIL05', year: 4, phoneNumber: '1200000140' },

  // --- FACULTY ---
  { name: 'Vasuki N', email: 'darsini132006@gmail.com', role: UserRole.FACULTY, department: Department.CSE, phoneNumber: '1200001000' },
  { name: 'Magesh N', email: 'faculty_cse2@gceerode.edu.in', role: UserRole.FACULTY, department: Department.CSE, phoneNumber: '1200001001' },
  { name: 'Gowrison G', email: 'faculty_ece1@gceerode.edu.in', role: UserRole.FACULTY, department: Department.ECE, phoneNumber: '1200001002' },
  { name: 'Barathi S', email: 'faculty_ece2@gceerode.edu.in', role: UserRole.FACULTY, department: Department.ECE, phoneNumber: '1200001003' },
  { name: 'Baby Priya B', email: 'faculty_eee1@gceerode.edu.in', role: UserRole.FACULTY, department: Department.EEE, phoneNumber: '1200001004' },
  { name: 'Vetrivel A', email: 'faculty_eee2@gceerode.edu.in', role: UserRole.FACULTY, department: Department.EEE, phoneNumber: '1200001005' },
  { name: 'Anurekha R', email: 'faculty_it1@gceerode.edu.in', role: UserRole.FACULTY, department: Department.IT, phoneNumber: '1200001006' },
  { name: 'Maheswari K G', email: 'faculty_it2@gceerode.edu.in', role: UserRole.FACULTY, department: Department.IT, phoneNumber: '1200001007' },
  { name: 'Senthilraja R', email: 'faculty_auto1@gceerode.edu.in', role: UserRole.FACULTY, department: Department.AUTO, phoneNumber: '1200001008' },
  { name: 'Shriram P', email: 'faculty_auto2@gceerode.edu.in', role: UserRole.FACULTY, department: Department.AUTO, phoneNumber: '1200001009' },
  { name: 'Gowtham P', email: 'faculty_mech1@gceerode.edu.in', role: UserRole.FACULTY, department: Department.MECH, phoneNumber: '1200001010' },
  { name: 'Nandakumar N S', email: 'faculty_mech2@gceerode.edu.in', role: UserRole.FACULTY, department: Department.MECH, phoneNumber: '1200001011' },
  { name: 'Gowthama kumar G M', email: 'faculty_civil1@gceerode.edu.in', role: UserRole.FACULTY, department: Department.CIVIL, phoneNumber: '1200001012' },
  { name: 'Sathies Kumar D', email: 'faculty_civil2@gceerode.edu.in', role: UserRole.FACULTY, department: Department.CIVIL, phoneNumber: '1200001013' },

  // --- HOD ---
  { name: 'Kavitha A', email: 'bharaniii535@gmail.com', role: UserRole.HOD, department: Department.CSE, phoneNumber: '1200002000' },
  { name: 'Raja M', email: 'hod_ece@gceerode.edu.in', role: UserRole.HOD, department: Department.ECE, phoneNumber: '1200002001' },
  { name: 'Mohammadha Hussaini M', email: 'hod_eee@gceerode.edu.in', role: UserRole.HOD, department: Department.EEE, phoneNumber: '1200002002' },
  { name: 'Bhuvaneshwarri I', email: 'hod_it@gceerode.edu.in', role: UserRole.HOD, department: Department.IT, phoneNumber: '1200002003' },
  { name: 'Senthilraja R', email: 'hod_auto@gceerode.edu.in', role: UserRole.HOD, department: Department.AUTO, phoneNumber: '1200002004' },
  { name: 'Balamurugan K', email: 'hod_mech@gceerode.edu.in', role: UserRole.HOD, department: Department.MECH, phoneNumber: '1200002005' },
  { name: 'Saravanakumar P', email: 'hod_civil@gceerode.edu.in', role: UserRole.HOD, department: Department.CIVIL, phoneNumber: '1200002006' },

  // --- ADMINISTRATION & STAFF ---
  { name: 'SelvaKumar P', email: 'office1@gceerode.edu.in', role: UserRole.OFFICE_STAFF, department: Department.GENERAL, phoneNumber: '1200003001' },
  { name: 'Kalki A', email: 'office2@gceerode.edu.in', role: UserRole.OFFICE_STAFF, department: Department.GENERAL, phoneNumber: '1200003002' },
  { name: 'Dharani M', email: 'office3@gceerode.edu.in', role: UserRole.OFFICE_STAFF, department: Department.GENERAL, phoneNumber: '1200003003' },
  { name: 'Premalatha D', email: 'kaviyas122004@gmail.com', role: UserRole.ADMINISTRATION, department: Department.ADMIN, phoneNumber: '1200004001' },
  { name: 'Sampath A', email: 'admin2@gceerode.edu.in', role: UserRole.ADMINISTRATION, department: Department.ADMIN, phoneNumber: '1200004002' },
  { name: 'Pranav S P', email: 'admin3@gceerode.edu.in', role: UserRole.ADMINISTRATION, department: Department.ADMIN, phoneNumber: '1200004003' },
  { name: 'Dharun E', email: 'placement1@gceerode.edu.in', role: UserRole.PLACEMENT_CELL, department: Department.GENERAL, phoneNumber: '1200005001' },
  { name: 'Anbu A', email: 'placement2@gceerode.edu.in', role: UserRole.PLACEMENT_CELL, department: Department.GENERAL, phoneNumber: '1200005002' },
  { name: 'Saradha A', email: 'nithyaa16042005@gmail.com', role: UserRole.ADMINISTRATION, department: Department.SUPER_ADMIN, isPrincipal: true, phoneNumber: '1200006001' },
];

export const validateMasterUser = (email: string, rollNumber?: string, phoneNumber?: string): MasterUser | undefined => {
  return MASTER_USERS.find(u => {
    const emailMatch = u.email.toLowerCase() === email.toLowerCase();
    const rollMatch = rollNumber ? (u.rollNumber?.toUpperCase() === rollNumber.toUpperCase()) : true;
    const phoneMatch = phoneNumber ? (u.phoneNumber === phoneNumber) : true;
    return emailMatch && rollMatch && phoneMatch;
  });
};

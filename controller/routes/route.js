const express = require('express');
const moment = require('moment');
const connection = require('../../model/database');
const router = express.Router();
let username = '';
let mail = '';
let pass = '';
let input = '';
router.get('/', (req, res) => {
  console.log('Hi login');
  res.render('login', { success: '' });
});
router.get('/Register', (req, res) => {
  console.log('Hi Register');
  res.render('register');
});
router.get('/Login', (req, res) => {
  console.log('Hi login');
  res.render('login', { success: '' });
});
/* admin */
router.get('/admin/dashboard', (req, res) => {
  res.render('admin_dashboard', { userData: username });
});
router.get('/admin/add_faculty', (req, res) => {
  res.render('add_faculty', { userData: username, success: '' });
});
router.get('/admin/add_student', (req, res) => {
  res.render('add_student', { userData: username, success: '' });
});
router.get('/admin/add_subject', (req, res) => {
  connection.query('select firstname,lastname from faculty ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render('add_subject', {
        userData: username, faculty: results, success: ''
      });
    }
  });
});
router.get('/student/subject_info', (req, res) => {
  res.render('subject_info', { userData: username, subjectData: '', sem: '' });
});
router.get('/admin/faculty_subject', (req, res) => {
  res.render('faculty_subject', {
    userData: username, subjectData: '', sem: '', success: '',
  });
});
router.get('/admin/mark_attendance', (req, res) => {
  connection.query('select sub_code from subject order by sem ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render('mark_attendance', {
        userData: username, subject_code: results, success: '',
      });
    }
  });
});
router.post('/admin/mark', (req, res) => {
  const { semester } = req.body;
  const sub = req.body.sub_code;
  const { time } = req.body;
  const { date } = req.body;
  const values = [sub, date];
  connection.query('insert into attendance (semester,time,subCode,date) values(?,?,?,?);', [semester, time, sub, date], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('row created');
    }
  });
  connection.query('select firstname,lastname,rollno from student order by rollno ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render('attendance', {
        studentData: results, userData: username, sem: semester, time, subject: sub, date, success: '',
      });
      console.log(sub);
    }
  });
});
router.get('/admin/edit_attendance', (req, res) => {
  connection.query('select sub_code from subject order by sem ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render('edit_attendance', {
        userData: username, subject_code: results, success: '',
      });
    }
  });
});
router.get('/attendance/report', (req, res) => {
  connection.query('select sub_code from subject order by sem ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render('report_generate', {
        userData: username, subject_code: results, success: '',
      });
    }
  });
});
router.get('/student/report/period', (req, res) => {
  connection.query('select sub_code from subject order by sem ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render('student_attendance_period', {
        userData: username, subject_code: results, success: '',
      });
    }
  });
});
router.get('/student/report/student', (req, res) => {
  connection.query('select sub_code from subject order by sem ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.render('student_attendance_student', {
        userData: username, subject_code: results, success: '',
      });
    }
  });
});
router.post('/report/period', (req, res) => {
  const { semester } = req.body;
  const sub = req.body.sub_code;
  const { time } = req.body;
  const { date } = req.body;
  connection.query('select  rollno from student order by rollno ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Reports displayed');
      connection.query('select  *  from attendance  where semester=? && time=? && subCode=? && date=?  ', [semester, time, sub, date], (err, result) => {
        if (results.lenth > 0) {
          const arr = [{ r1: result[0]._18IT01, r2: results[0].rollno },
          { r1: result[0]._18IT02, r2: results[1].rollno },
          { r1: result[0]._18IT03, r2: results[2].rollno },
          { r1: result[0]._18IT04, r2: results[3].rollno },
          { r1: result[0]._18IT05, r2: results[4].rollno },
          { r1: result[0]._18IT06, r2: results[5].rollno },
          { r1: result[0]._18IT07, r2: results[6].rollno },
          { r1: result[0]._18IT08, r2: results[7].rollno },
          { r1: result[0]._18IT09, r2: results[8].rollno },
          { r1: result[0]._18IT10, r2: results[9].rollno },
          { r1: result[0]._18IT11, r2: results[10].rollno },
          { r1: result[0]._18IT12, r2: results[11].rollno },
          { r1: result[0]._18IT13, r2: results[12].rollno },
          { r1: result[0]._18IT14, r2: results[13].rollno },
          { r1: result[0]._18IT15, r2: results[14].rollno },
          { r1: result[0]._18IT16, r2: results[15].rollno },
          { r1: result[0]._18IT17, r2: results[16].rollno },
          { r1: result[0]._18IT18, r2: results[17].rollno },
          { r1: result[0]._18IT19, r2: results[18].rollno },
          { r1: result[0]._18IT20, r2: results[19].rollno },
          { r1: result[0]._18IT21, r2: results[20].rollno },
          { r1: result[0]._18IT22, r2: results[21].rollno },
          { r1: result[0]._18IT23, r2: results[22].rollno },
          { r1: result[0]._18IT25, r2: results[23].rollno },
          { r1: result[0]._18IT26, r2: results[24].rollno },
          { r1: result[0]._18IT27, r2: results[25].rollno },
          { r1: result[0]._18IT28, r2: results[26].rollno },
          { r1: result[0]._18IT29, r2: results[27].rollno },
          { r1: result[0]._18IT30, r2: results[28].rollno },
          { r1: result[0]._18IT31, r2: results[29].rollno },
          { r1: result[0]._18IT32, r2: results[30].rollno },
          { r1: result[0]._18IT33, r2: results[31].rollno },
          { r1: result[0]._18IT34, r2: results[32].rollno },
          ];
          console.log(arr);

          res.render('students_report_period', {
            report: results, userData: username, colvalue: result, attendance: arr,
          });

        } else {
          connection.query('select sub_code from subject order by sem ', (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              res.render('student_attendance_period', {
                userData: username, subject_code: results, success: 'Invalid details',
              });
            }
          });
        }
        if (err) throw err;
      });
    }
  });
});
router.post('/attendance/report/generate', (req, res) => {
  const { semester } = req.body;
  const sub = req.body.sub_code;
  const { time } = req.body;
  const { date } = req.body;
  connection.query('select  rollno from student order by rollno ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      connection.query('select  *  from attendance  where semester=? && time=? && subCode=? && date=?  ', [semester, time, sub, date], (err, result) => {
        if (result.length > 0) {
          const arr = [{ r1: result[0]._18IT01, r2: results[0].rollno },
          { r1: result[0]._18IT02, r2: results[1].rollno },
          { r1: result[0]._18IT03, r2: results[2].rollno },
          { r1: result[0]._18IT04, r2: results[3].rollno },
          { r1: result[0]._18IT05, r2: results[4].rollno },
          { r1: result[0]._18IT06, r2: results[5].rollno },
          { r1: result[0]._18IT07, r2: results[6].rollno },
          { r1: result[0]._18IT08, r2: results[7].rollno },
          { r1: result[0]._18IT09, r2: results[8].rollno },
          { r1: result[0]._18IT10, r2: results[9].rollno },
          { r1: result[0]._18IT11, r2: results[10].rollno },
          { r1: result[0]._18IT12, r2: results[11].rollno },
          { r1: result[0]._18IT13, r2: results[12].rollno },
          { r1: result[0]._18IT14, r2: results[13].rollno },
          { r1: result[0]._18IT15, r2: results[14].rollno },
          { r1: result[0]._18IT16, r2: results[15].rollno },
          { r1: result[0]._18IT17, r2: results[16].rollno },
          { r1: result[0]._18IT18, r2: results[17].rollno },
          { r1: result[0]._18IT19, r2: results[18].rollno },
          { r1: result[0]._18IT20, r2: results[19].rollno },
          { r1: result[0]._18IT21, r2: results[20].rollno },
          { r1: result[0]._18IT22, r2: results[21].rollno },
          { r1: result[0]._18IT23, r2: results[22].rollno },
          { r1: result[0]._18IT25, r2: results[23].rollno },
          { r1: result[0]._18IT26, r2: results[24].rollno },
          { r1: result[0]._18IT27, r2: results[25].rollno },
          { r1: result[0]._18IT28, r2: results[26].rollno },
          { r1: result[0]._18IT29, r2: results[27].rollno },
          { r1: result[0]._18IT30, r2: results[28].rollno },
          { r1: result[0]._18IT31, r2: results[29].rollno },
          { r1: result[0]._18IT32, r2: results[30].rollno },
          { r1: result[0]._18IT33, r2: results[31].rollno },
          { r1: result[0]._18IT34, r2: results[32].rollno },
          ];
          console.log(arr);
          res.render('report', {
            report: results, userData: username, colvalue: result, attendance: arr,
          });
        } else {
          connection.query('select sub_code from subject order by sem ', (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              res.render('report_generate', {
                userData: username, subject_code: result, success: 'Invalid details',
              });
            }
          });
        }
        if (err) throw err;
      });
    }
  });
});
router.post('/admin/attendence/submit/:sem/:time/:sub/:date', (req, res) => {
  const att = req.body.SelectedValues;
  const r0 = req.body.att[0]; const r1 = req.body.att[1]; const r2 = req.body.att[2]; const r3 = req.body.att[3];
  const r4 = req.body.att[4]; const r5 = req.body.att[5]; const r6 = req.body.att[6]; const r7 = req.body.att[7];
  const r8 = req.body.att[8]; const r9 = req.body.att[9]; const r10 = req.body.att[10]; const r11 = req.body.att[11];
  const r12 = req.body.att[12]; const r13 = req.body.att[13]; const r14 = req.body.att[14]; const r15 = req.body.att[15];
  const r16 = req.body.att[16]; const r17 = req.body.att[17]; const r18 = req.body.att[18]; const r19 = req.body.att[19];
  const r20 = req.body.att[20]; const r21 = req.body.att[21]; const r22 = req.body.att[22]; const r23 = req.body.att[23];
  const r25 = req.body.att[24]; const r26 = req.body.att[25]; const r27 = req.body.att[26]; const r28 = req.body.att[27];
  const r29 = req.body.att[28]; const r30 = req.body.att[29]; const r31 = req.body.att[30]; const r32 = req.body.att[31];
  const r33 = req.body.att[32];
  console.log(req.body);
  const values = [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r25, r26, r27, r28, r29, r30, r31, r32, r33, req.params.sem, req.params.time, req.params.sub, req.params.date];
  const sql = 'update attendance set _18IT01=?, _18IT02=? ,_18IT03=?, _18IT04=?, _18IT05=?, _18IT06=?, _18IT07=?, _18IT08=?, _18IT09=?, _18IT10=?, _18IT11=?, _18IT12=?, _18IT13=?, _18IT14=?, _18IT15=?,_18IT16=?, _18IT17=?,_18IT18=?,_18IT19=?,_18IT20=?,_18IT21=?,_18IT22=?,_18IT23=?,_18IT25=?,_18IT26=?,_18IT27=?,_18IT28=?,_18IT29=?,_18IT30=?,_18IT31=?,_18IT32=?,_18IT33=?,_18IT34=?  where semester=? && time=? && subCode=? && date=? ';
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('attendance marked');
    }
    res.render('mark_attendance', { userData: username, success: 'Attendance marked successfully' });
  });
});
router.get('/admin/subject/edit/:sub_code', (req, res) => {
  connection.query('select * from subject where sub_code=?', [req.params.sub_code], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Subject Selected');
      res.render('edit_subject', { userData: username, subjectData: results, success: '' });
    }
  });
});
router.get('/student/class_student', (req, res) => {
  connection.query('select  count(*) as strength  from student ', (err, count) => {
    if (err) throw err;
    if (count.length > 0) {
      console.log(count);
      connection.query('select count(*) as male from student  where gender= "Male" ', (err, male) => {
        console.log(male);
        connection.query('select count(*) as female from student  where gender= "Female" ', (err, female) => {
          console.log(female);
          connection.query('select *  from class ', (err, classinfo) => {
            res.render('class_student', {
              class_info: classinfo, scount: count[0].strength, male_count: male[0].male, female_count: female[0].female, userData: username,
            });
          });
        });
      });
    }
  });
});
router.get('/admin/class_admin', (req, res) => {
  connection.query('select  count(*) as strength  from student ', (err, count) => {
    if (err) throw err;
    if (count.length > 0) {
      console.log(count);
      connection.query('select count(*) as male from student  where gender= "Male" ', (err, male) => {
        console.log(male);
        connection.query('select count(*) as female from student  where gender= "Female" ', (err, female) => {
          console.log(female);
          connection.query('select *  from class ', (err, classinfo) => {
            res.render('class_admin', {
              class_info: classinfo, scount: count[0].strength, male_count: male[0].male, female_count: female[0].female, userData: username,
            });
          });
        });
      });
    }
  });
});
router.post('/admin/subject/edit', (req, res, next) => {
  const { subcode } = req.body;
  const { subname } = req.body;
  const { credit } = req.body;
  const classIT = req.body.class;
  const { sem } = req.body;
  const { faculty_name } = req.body;
  const { position } = req.body;
  const values = [subcode, subname, credit, classIT, sem, faculty_name, position, subcode];
  const sql = 'UPDATE subject SET sub_code=?,sub_name=?,credit=?,class=?,sem=?,faculty_name=?,pos=? where sub_code= ?';
  connection.query(sql, values, (err, result) => {
  });
  connection.query('select * from subject where sub_code=?', [subcode], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Subject Selected');
      console.log(results);
      res.render('edit_subject', { userData: username, subjectData: results, success: 'Updated Successfully' });
    }
  });
});
router.get('/admin/subject/delete/:sub_code', (req, res) => {
  connection.query('delete from subject where sub_code=?', [req.params.sub_code], (err, results) => {
    if (err) throw err;
    console.log('subject deleted');
    const sem = input;
    connection.query('select * from subject where sem=? order by credit DESC', [sem], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        console.log('Subject Selected');
        res.render('faculty_subject', { subjectData: results, userData: username, sem: input });
      }
    });
  });
});
/* Student */
router.get('/student/dashboard', (req, res) => {
  res.render('student_dashboard', { userData: username });
});
router.get('/admin/students_list', (req, res) => {
  connection.query('select * from student order by rollno ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Students records displayed');
      res.render('students_list', { studentData: results, userData: username });
    }
  });
});
router.post('/admin/semester', (req, res) => {
  input = req.body.semester;
  connection.query('select * from subject where sem=? order by credit DESC', [input], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Subject Selected');
      res.render('faculty_subject', { subjectData: results, userData: username, sem: input });
    }
  });
});
router.post('/student/semester', (req, res) => {
  const inputsem = req.body.semester;
  connection.query('select * from subject where sem=?', [inputsem], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Subject Selected');
      res.render('subject_info', { subjectData: results, userData: username, sem: inputsem });
    }
  });
});
//LOGIN
router.post('/user/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    const re = /\d/g;
    if (re.test(`${email}`)) {
      connection.query('select sname,semail from student_signup where semail = ? AND spassword=?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          console.log('Login Successfully');
          username = results[0].sname;
          mail = results[0].semail;
          console.log(results);
          res.render('student_dashboard', { userData: username });

        } else {
          setTimeout(() => {
            res.render('Login', { success: 'Please try Again' });
          }, 2000);
        }
      });
    } else {
      connection.query('select fname,femail from faculty_signup where femail = ? AND fpassword=?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          console.log('Login Successfully');
          username = results[0].fname;
          mail = results[0].femail;
          console.log(results);
          res.render('admin_dashboard', { userData: username });
        } else {
          setTimeout(() => {
            res.render('Login', { success: 'Please try Again' });
          }, 2000);
        }
      });
    }
  }
  else {
    setTimeout(() => {
      res.render('Login', { success: 'Please try Again' });
    }, 2000);
  }
});
router.post('/user_signup', (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const pass = req.body.pwd1;
  const re = /\d/g;
  if (re.test(`${email}`)) {
    connection.query('insert into student_signup values(?,?,?)', [name, email, pass], (err, results) => {
      if (err) throw err;
      if (name.length != 0) {
        console.log('Values Inserted');
        setTimeout(() => {
          res.render('Login', { success: '' });
        }, 2000);
      } else {
        setTimeout(() => {
          res.render('register');
        }, 2000);
      }
    });
  } else {
    connection.query('insert into faculty_signup values(?,?,?)', [name, email, pass], (err, results) => {
      if (err) throw err;
      if (name.length != 0) {
        console.log('Values Inserted');
        setTimeout(() => {
          res.render('Login', { userData: username, success: '' });
        }, 2000);
      } else {
        setTimeout(() => {
          res.render('register');
        }, 2000);
      }
    });
  }
});
router.post('/add_student', (req, res) => {
  console.log('validated');
  const { fname } = req.body;
  const { lname } = req.body;
  const { rollno } = req.body;
  const { regno } = req.body;
  const { batch } = req.body;
  const { email } = req.body;
  const { dob } = req.body;
  const { hos_day } = req.body;
  const { gender } = req.body;
  const { address } = req.body;
  const { mobno } = req.body;
  const { city } = req.body;
  const { state } = req.body;
  const { pincode } = req.body;
  connection.query('insert into student values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [fname, lname, rollno, regno, email, dob, hos_day, gender, address, mobno, city, state, pincode, batch], (err, results) => {
    if (err) throw err;
    if (results) {
      console.log('Student Inserted');
      res.render('add_student', { userData: username, success: 'Successfully Added!' });
    }
  });
});
router.post('/add_faculty', (req, res) => {
  console.log('validated');
  const { fname } = req.body;
  const { lname } = req.body;
  const { department } = req.body;
  const { position } = req.body;
  const { email } = req.body;
  const { dob } = req.body;
  const { gender } = req.body;
  const { address } = req.body;
  const { mobno } = req.body;
  const { city } = req.body;
  const { state } = req.body;
  const { pincode } = req.body;
  connection.query('insert into faculty values(?,?,?,?,?,?,?,?,?,?,?,?)', [fname, lname, department, position, email, dob, gender, address, mobno, city, state, pincode], (err, results) => {
    if (err) throw err;
    if (results) {
      console.log('Faculty Inserted');
      res.render('add_faculty', { userData: username, success: 'Successfully Added!' });
    }
  });
});
router.post('/add-subject', (req, res) => {
  console.log('validated');
  const { subcode } = req.body;
  const { subname } = req.body;
  const { credit } = req.body;
  const classIT = req.body.class;
  const { sem } = req.body;
  const { faculty_name } = req.body;
  const { position } = req.body;
  connection.query('insert into subject values(?,?,?,?,?,?,?)', [subcode, subname, credit, classIT, sem, faculty_name, position], (err, results) => {
    if (err) throw err;
    if (results) {
      console.log('Subject Inserted');
      res.render('add_subject', { userData: username, success: 'Successfully Added!' });
    }
  });
});
router.get('/student/profile', (req, res) => {
  connection.query('select * from student where email = ? ', [mail], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('My profile');
      username = results[0].firstname;
      res.render('student_profile', { userData: results, name: username, success: '' });
    }
  });
});
router.get('/admin/faculty_profile', (req, res) => {
  connection.query('select * from faculty where email = ? ', [mail], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('My profile');
      username = results[0].firstname;
      res.render('faculty_profile', { userData: results, name: username, success: '' });
    }
  });
});
router.post('/admin/update', (req, res, next) => {
  const { fname } = req.body;
  const { lname } = req.body;
  const { department } = req.body;
  const { position } = req.body;
  const { email } = req.body;
  const { dob } = req.body;
  const { address } = req.body;
  const { mobno } = req.body;
  const { city } = req.body;
  const { state } = req.body;
  const { pincode } = req.body;
  const values = [fname, lname, department, position, email, dob, address, mobno, city, state, pincode, mail];
  const sql = 'UPDATE faculty SET firstname =?,lastname=?,department=?,position=?,email=?,dob=?,address=?,mobileno=?,city=?,state=?,pincode=? where email= ?';
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log('updated');
    username = result.firstname;
    console.log(username);
    connection.query('select * from faculty where email=?', [email], (err, results) => {
      console.log(results);
      res.render('faculty_profile', { userData: results, name: results[0].firstname, success: 'Profile Updated Successfully!' });
    });
  });
});
router.post('/student/update', (req, res, next) => {
  const { fname } = req.body;
  const { lname } = req.body;
  const { rollno } = req.body;
  const { regno } = req.body;
  const { batch } = req.body;
  const { email } = req.body;
  const { dob } = req.body;
  const { hos_day } = req.body;
  const { address } = req.body;
  const { mobno } = req.body;
  const { city } = req.body;
  const { state } = req.body;
  const { pincode } = req.body;
  const values = [fname, lname, rollno, regno, email, dob, hos_day, address, mobno, city, state, pincode, batch, mail];
  const sql = 'UPDATE student SET firstname =?,lastname=?,rollno=?,regno=?,email=?,dob=?,hos_day=?,address=?,mobileno=?,city=?,state=?,pincode=?,batch=? where email= ?';
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log('updated');
    username = result.firstname;
    connection.query('select * from student where email=?', [email], (err, results) => {
      res.render('student_profile', { userData: results, name: results[0].firstname, success: 'Profile Updated Successfully!' });
    });
  });
});
router.get('/admin/faculty', (req, res) => {
  connection.query('select * from faculty ', (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Faculty List displayed');
      res.render('faculty', { facultyData: results, userData: username });
    }
  });
});
router.get('/admin/faculty/delete/:email', (req, res) => {
  connection.query('delete from faculty where email=?', [req.params.email], (err, results) => {
    if (err) throw err;
    console.log('Faculty deleted');
    res.redirect('/admin/faculty');
  });
});
module.exports = router;

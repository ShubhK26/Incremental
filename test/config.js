const noOfDay = 25;

const testSuites = [
  {
    day: 1,
    dayWiseTestcase: [
      {
        fileName: [
          "DayTwoTest.java"
        ],
        testcases: [
          ""
        ]
      }
    ]
  },

  {
    day: 2,
    dayWiseTestcase: [
      {
        fileName: [
          "DayTwoTest.java"
        ],
        testcases: [
          {
            "name": "testAddTeacherToArrayList_Day2",
            "value": "test Add Teacher To ArrayList_Day2"
          },
          {
            "name": "testGetAllTeachersSortedByExperienceFromArrayList_Day2",
            "value": "test Get All Teachers Sorted By Experience From ArrayList_Day2"
          },
          {
            "name": "testGetAllTeachers_Day2",
            "value": "test Get All Teachers_Day2"
          },
          {
            "name": "testGetAllStudentsSortedByName_Day2",
            "value": "test Get All Students Sorted By Name_Day2"
          },
          {
            "name": "testAddStudentToArrayList_Day2",
            "value": "test Add Student To ArrayList_Day2"
          }
        ]
      }
    ]
  },
  {
    day: 3,
    dayWiseTestcase: [
      {
        fileName: [
          "DayThreeTest.java"
        ],
        testcases: [
          {
            "name": "testGetAllTeachers_Day3",
            "value": "test Get All Teachers_Day3"
          },
          {
            "name": "testAddTeacher_Day3",
            "value": "test Add Teacher_Day3"
          },
          {
            "name": "testUpdateTeacher_Day3",
            "value": "test Update Teacher_Day3"
          },
          {
            "name": "testDeleteTeacher_Day3",
            "value": "test Delete Teacher_Day3"
          },
          {
            "name": "testGetAllTeachersSortedByNameFromArrayList_Day3",
            "value": "test Get All Teachers Sorted By Name From ArrayList_Day3"
          },
          {
            "name": "testAddStudent_Day3",
            "value": "test Add Student_Day3"
          },
          {
            "name": "testUpdateStudent_Day3",
            "value": "test Update Student_Day3"
          },
          {
            "name": "testDeleteStudent_Day3",
            "value": "test Delete Student_Day3"
          },
          {
            "name": "testGetAllStudents_Day3",
            "value": "test Get All Students_Day3"
          },
          {
            "name": "testGetAllStudentsSortedByName_Day3",
            "value": "test Get All Students Sorted By Name_Day3"
          },
          {
            "name": "testGetAllCoursees_Day3",
            "value": "test Get All Coursees_Day3"
          },
          {
            "name": "testGetCourseById_Day3",
            "value": "test Get Course By Id_Day3"
          },
          {
            "name": "testUpdateCourse_Day3",
            "value": "test Update Course_Day3"
          },
          {
            "name": "testDeleteCourse_Day3",
            "value": "test Delete Course_Day3"
          }
        ]
      }
    ]
  },
  {
    day: 4,
    dayWiseTestcase: [
      {
        fileName: [
          "DayFourTest.java"
        ],
        testcases: [
          {
            "name": "testMainMethodOutput_Day4",
            "value": "test Main Method Output_Day4"
          }
        ]
      }
    ]
  },
  {
    day: 5,
    dayWiseTestcase: [
      {
        fileName: [
          "DayFiveTest.java"
        ],
        testcases: [
          {
            "name": "testAddPatientToArrayList_Day5",
            "value": "test Add Patient To ArrayList_Day5"
          },
          {
            "name": "testGetAllPatientsSortedByNameFromArrayList_Day5",
            "value": "test Get All Patients Sorted By Name From ArrayList_Day5"
          },
          {
            "name": "testGetAllPatient_Day5",
            "value": "test Get All Patient_Day5"
          }
        ]
      }
    ]
  },
  {
    "day": 6,
    "dayWiseTestcase": [
      {
        "fileName": [
          "DaySixTest.java"
        ],
        "testcases": [
          {
            "name": "testGetAllStudent_Day6",
            "value": "test Get All Student_Day6"
          },
          {
            "name": "testGetAllStudentsSortedByName_Day6",
            "value": "test Get All Students Sorted By Name_Day6"
          },
          {
            "name": "testUpdateStudentController_Day6",
            "value": "test Update Student Controller_Day6"
          },
          {
            "name": "testDeleteStudentController_Day6",
            "value": "test Delete Student Controller_Day6"
          }
        ]
      }
    ]
  },
  {
    day: 7,
    dayWiseTestcase: [
      {
        fileName: [
          "DaySevenTest.java"
        ],
        testcases: [
          {
            name: "testAddTeacherController_Day7",
            value: "test Add Teacher Controller_Day7"
          },
          {
            name: "testUpdateTeacherController_Day7",
            value: "test Update Teacher Controller_Day7"
          },
          {
            name: "testDeleteTeacherController_Day7",
            value: "test Delete Teacher Controller_Day7"
          },
          {
            name: "testGetAllTeacher_Day7",
            value: "test Get All Teacher_Day7"
          },
          {
            name: "testGetTeacherById_Day7",
            value: "test Get Teacher By Id_Day7"
          }
        ]
      }
    ]
  },
  {
    day: 8,
    dayWiseTestcase: [
      {
        fileName: [
          "DayEightTest.java"
        ],
        testcases: [
          {
            name: "testGetAllCoursesController_Day8",
            value: "test Get All Courses Controller_Day8"
          },
          {
            name: "testUpdateCourse_Day8",
            value: "test Update Course_Day8"
          },
          {
            name: "testDeleteCourse_Day8",
            value: "test Delete Course_Day8"
          }
        ]
      }
    ]
  },
  {
    "day": 9,
    "dayWiseTestcase": [
      {
        "fileName": [
          "DayNineTest.java"
        ],
        "testcases": [
          {
            "name": "testAddStudentThrowsStudentAlreadyExistsException_Day9",
            "value": "test Add Student Throws Student Already Exists Exception_Day9"
          },
          {
            "name": "testAddTeacherThrowsTeacherAlreadyExistsException_Day9",
            "value": "test Add Teacher Throws Teacher Already Exists Exception_Day9"
          },
          {
            "name": "testCourseNotFoundException_Day9",
            "value": "test Course Not Found Exception_Day9"
          },
          {
            "name": "testDoesNotThrowTeacherAlreadyExistsException_Day9",
            "value": "test Does Not Throw Teacher Already Exists Exception_Day9"
          }
        ]
      }
    ]
  },
  {
    "day": 10,
    "dayWiseTestcase": [
      {
        "fileName": [
          "DayTenTest.java"
        ],
        "testcases": [
          {
            "name": "testServiceGetAllEnrollments_Day10",
            "value": "test Service Get All Enrollments_Day10"
          },
          {
            "name": "testServiceGetEnrollmentById_Day10",
            "value": "test Service Get Enrollment By Id_Day10"
          },
          {
            "name": "testControllerCreateEnrollment_Day10",
            "value": "test Controller Create Enrollment_Day10"
          }
        ]
      }
    ]
  },
  {
    "day": 11,
    "dayWiseTestcase": [
      {
        "fileName": [
          "DayElevenTest.java"
        ],
        "testcases": [
          {
            "name": "testCreateAttendance_Day11",
            "value": "test Create Attendance_Day11"
          },
          {
            "name": "testGetAllAttendances_Day11",
            "value": "test Get All Attendances_Day11"
          },
          {
            "name": "testGetAttendancesByStudentId_Day11",
            "value": "test Get Attendances By Student Id_Day11"
          },
          {
            "name": "testDeleteAttendanceService_Day11",
            "value": "test Delete Attendance Service_Day11"
          }
        ]
      }
    ]
  },
  {
    "day": 12,
    "dayWiseTestcase": [
      {
        "fileName": [
          "DayTwelveTest.java"
        ],
        "testcases": [
          {
            "name": "testGenerateToken_Day12",
            "value": "test Generate Token_Day12"
          },
          {
            "name": "testValidateToken_Day12",
            "value": "test Validate Token_Day12"
          },
          {
            "name": "testGetStudent_Day12",
            "value": "test Get Student_Day12"
          },
          {
            "name": "testUnauthorisedAddTeacher_Day12",
            "value": "test Unauthorised Add Teacher_Day12"
          },
          {
            "name": "testTeacherControllerAddTeacher_Day12",
            "value": "test Teacher Controller Add Teacher_Day12"
          },
          {
            "name": "testAddCourse_Day12",
            "value": "test Add Course_Day12"
          }
        ]
      }
    ]
  },
  {
    "day": 13,
    "dayWiseTestcase": [
      {
        "fileName": [
          "DayThirteenTest.java"
        ],
        "testcases": [
          {
            "name": "testCreateTimetable_Day13",
            "value": "test Create Timetable_Day13"
          },
          {
            "name": "testGetAllTimetables_Day13",
            "value": "test Get All Timetables_Day13"
          },
          {
            "name": "testGetTimetableById_Day13",
            "value": "test Get Timetable By Id_Day13"
          },
          {
            "name": "testUpdateTimetable_Day13",
            "value": "test Update Timetable_Day13"
          },
          {
            "name": "testDeleteTimetable_Day13",
            "value": "test Delete Timetable_Day13"
          }
        ]
      }
    ]
  },
  {
    day: 14,
    dayWiseTestcase: [
      {
        fileName: [
          "day_14_15.test.js"
        ],
        testcases: [
          ""
        ]
      }
    ]
  },
  {
    day: 15,
    dayWiseTestcase: [
      {
        fileName: [
          "day_14_15.test.js"
        ],
        testcases: [
          {
            "name": "test login function should log correct information - Day 15",
            "value": "test login function should log correct information - Day 15"
          },
          {
            "name": "test register function should log correct information - Day 15",
            "value": "test register function should log correct information - Day 15"
          }
        ]
      }
    ]
  },
  {
    day: 16,
    dayWiseTestcase: [
      {
        fileName: [
          "day_16.spec.ts"
        ],
        testcases: [
          {
            "name": "Model Classes Test Suite should create a Student object and log its attributes",
            "value": "Model Classes Test Suite should create a Student object and log its attributes"
          },
          {
            "name": "Model Classes Test Suite should create a Teacher object and log its attributes",
            "value": "Model Classes Test Suite should create a Teacher object and log its attributes"
          },
          {
            "name": "Model Classes Test Suite should create a Course object and log its attributes",
            "value": "Model Classes Test Suite should create a Course object and log its attributes"
          },
          {
            "name": "Model Classes Test Suite should create an Enrollment object and log its attributes",
            "value": "Model Classes Test Suite should create an Enrollment object and log its attributes"
          }
        ]
      }
    ]
  },
  {
    day: 17,
    dayWiseTestcase: [
      {
        fileName: [
          "day_17.spec.ts"
        ],
        testcases: [
          {
            "name": "StudentSampleComponent should create the student component",
            "value": "Student Sample Component should create the student component"
          },
          {
            "name": "StudentSampleComponent should display student details",
            "value": "Student Sample Component should display student details"
          },
          {
            "name": "TeacherSampleComponent should create the teacher component",
            "value": "Teacher Sample Component should create the teacher component"
          },
          {
            "name": "TeacherSampleComponent should display teacher details",
            "value": "Teacher Sample Component should display teacher details"
          }
        ]
      }
    ]
  },

  {
    day: 18,
    dayWiseTestcase: [
      {
        fileName: [
          "day_18.spec.ts"
        ],
        testcases: [
          {
            name: "StudentCreateComponent should create the component",
            value: "Student Create Component should create the component"
          },
          {
            name: "StudentCreateComponent should initialize with an empty student object",
            value: "Student Create Component should initialize with an empty student object"
          },
          {
            name: "StudentCreateComponent should display an error message if the form is invalid and submitted",
            value: "Student Create Component should display an error message if the form is invalid and submitted"
          },
          {
            name: "StudentCreateComponent should display a success message if the form is valid and submitted",
            value: "Student Create Component should display a success message if the form is valid and submitted"
          },
          {
            name: "TeacherArrayComponent should create the component",
            value: "Teacher Array Component should create the component"
          },
          {
            name: "TeacherArrayComponent should render the list of teachers",
            value: "Teacher Array Component should render the list of teachers"
          }
        ]
      }
    ]
  },
  {
    day: 19,
    dayWiseTestcase: [
      {
        fileName: [
          "day_19.spec.ts"
        ],
        testcases: [
          {
            name: "TeacherCreateComponentshould create the component",
            value: "Teacher Create Component should create the component"
          },
          {
            name: "TeacherCreateComponent should initialize the form with default values",
            value: "Teacher Create Component should initialize the form with default values"
          },
          {
            name: "TeacherCreateComponent should validate teacher form inputs",
            value: "Teacher Create Component should validate teacher form inputs"
          },
          {
            name: "TeacherCreateComponent should mark form as valid when all fields are filled correctly",
            value: "Teacher Create Component should mark form as valid when all fields are filled correctly"
          },
          {
            name: "TeacherCreateComponent should display a success message on valid form submission",
            value: "Teacher Create Component should display a success message on valid form submission"
          },
          {
            name: "CourseCreateComponent should create the component",
            value: "Course Create Component should create the component"
          },
          {
            name: "CourseCreateComponent should initialize the form with default values",
            value: "Course Create Component should initialize the form with default values"
          },
          {
            name: "CourseCreateComponent should mark form as invalid if required fields are empty",
            value: "Course Create Component should mark form as invalid if required fields are empty"
          },
          {
            name: "CourseCreateComponent should display a success message on valid form submission",
            value: "Course Create Component should display a success message on valid form submission"
          }
        ]
      }
    ]
  },
  {
    day: 20,
    dayWiseTestcase: [
      {
        fileName: [
          "day_20.spec.ts"
        ],
        testcases: [
          {
            "name": "EnrollmentComponent should create the component",
            "value": "Enrollment Component should create the component"
          },
          {
            "name": "EnrollmentComponent should initialize the form with default values",
            "value": "Enrollment Component should initialize the form with default values"
          },
          {
            "name": "EnrollmentComponent should mark form as invalid when required fields are missing",
            "value": "Enrollment Component should mark form as invalid when required fields are missing"
          },
          {
            "name": "EnrollmentComponent should mark form as valid when all required fields are filled",
            "value": "Enrollment Component should mark form as valid when all required fields are filled"
          },
          {
            "name": "EnrollmentComponent should reset the form when the reset button is clicked",
            "value": "Enrollment Component should reset the form when the reset button is clicked"
          },
          {
            "name": "EnrollmentComponent should display a success message when the form is submitted with valid data",
            "value": "Enrollment Component should display a success message when the form is submitted with valid data"
          }
        ]
      }
    ]
  },
  {
    day: 21,
    dayWiseTestcase: [
      {
        fileName: [
          "day_21.spec.ts"
        ],
        testcases: [
          {
            "name": "Auth Components Test Suite LoginComponent should create the login component",
            "value": "Auth Components Test Suite Login Component should create the login component"
          },
          {
            "name": "Auth Components Test Suite LoginComponent should initialize login form with empty fields",
            "value": "Auth Components Test Suite Login Component should initialize login form with empty fields"
          },
          {
            "name": "Auth Components Test Suite LoginComponent should validate username and password as required",
            "value": "Auth Components Test Suite Login Component should validate username and password as required"
          },
          {
            "name": "Auth Components Test Suite LoginComponent should display an error message if form is invalid on submit",
            "value": "Auth Components Test Suite Login Component should display an error message if form is invalid on submit"
          },
          {
            "name": "Auth Components Test Suite LoginComponent should display a success message on valid form submission",
            "value": "Auth Components Test Suite Login Component should display a success message on valid form submission"
          },
          {
            "name": "Auth Components Test Suite RegistrationComponent should create the registration component",
            "value": "Auth Components Test Suite Registration Component should create the registration component"
          },
          {
            "name": "Auth Components Test Suite RegistrationComponent should initialize registration form with empty fields",
            "value": "Auth Components Test Suite Registration Component should initialize registration form with empty fields"
          },
          {
            "name": "Auth Components Test Suite RegistrationComponent should validate required fields for registration form",
            "value": "Auth Components Test Suite Registration Component should validate required fields for registration form"
          },
          {
            "name": "Auth Components Test Suite RegistrationComponent should display a success message on valid registration",
            "value": "Auth Components Test Suite Registration Component should display a success message on valid registration"
          },
          {
            "name": "Auth Components Test Suite RegistrationComponent should display an error message for invalid registration form",
            "value": "Auth Components Test Suite Registration Component should display an error message for invalid registration form"
          }
        ]
      }
    ]
  },
  {
    day: 22,
    dayWiseTestcase: [
      {
        fileName: [
          "day_22.spec.ts"
        ],
        testcases: [
          {
            "name": "AuthService should be created",
            "value": "Auth Service should be created"
          },
          {
            "name": "AuthService login should make a POST request to login",
            "value": "Auth Service login should make a POST request to login"
          },
          {
            "name": "AuthService getToken should get the token from localStorage",
            "value": "Auth Service get Token should get the token from localStorage"
          },
          {
            "name": "AuthService createUser should make a POST request to create a user",
            "value": "Auth Service create User should make a POST request to create a user"
          },
          {
            "name": "LoginComponent should create the component",
            "value": "Login Component should create the component"
          },
          {
            "name": "LoginComponent ngOnInit should initialize the userForm with empty fields and validators",
            "value": "Login Component ngOnInit should initialize the userForm with empty fields and validators"
          },
          {
            "name": "LoginComponent onSubmit should not call authService.login if the form is invalid",
            "value": "Login Component onSubmit should not call authService.login if the form is invalid"
          },
          {
            "name": "LoginComponent onSubmit should call authService.login with the login data if the form is valid",
            "value": "Login Component onSubmit should call authService.login with the login data if the form is valid"
          },
          {
            "name": "RegistrationComponent should create the component",
            "value": "Registration Component should create the component"
          },
          {
            "name": "RegistrationComponent ngOnInit should initialize the registrationForm with empty fields and validators",
            "value": "Registration Component ngOnInit should initialize the registrationForm with empty fields and validators"
          }
        ]
      }
    ]
  },
  {
    day: 23,
    dayWiseTestcase: [
      {
        fileName: [
          "day_23.spec.ts"
        ],
        testcases: [
          {
            "name": "DashboardComponent should create the component",
            "value": "Dashboard Component should create the component"
          },
          {
            "name": "DashboardComponent ngOnInit should load teacher data if role is TEACHER",
            "value": "Dashboard Component ngOnInit should load teacher data if role is TEACHER"
          },
          {
            "name": "DashboardComponent ngOnInit should not call loadTeacherData if role is not TEACHER",
            "value": "Dashboard Component ngOnInit should not call load Teacher Data if role is not TEACHER"
          },
          {
            "name": "DashboardComponent loadTeacherData should load teacher details",
            "value": "Dashboard Component load Teacher Data should load teacher details"
          },
          {
            "name": "DashboardComponent loadTeacherData should load courses",
            "value": "Dashboard Component load Teacher Data should load courses"
          },
          {
            "name": "DashboardComponent loadTeacherData should load all students",
            "value": "Dashboard Component load Teacher Data should load all students"
          },
          {
            "name": "CourseCreateComponent should create the component",
            "value": "Course Create Component should create the component"
          },
          {
            "name": "CourseCreateComponent should initialize the form",
            "value": "Course Create Component should initialize the form"
          },
          {
            "name": "CourseCreateComponent should submit the form and call addCourse API",
            "value": "Course Create Component should submit the form and call addCourse API"
          }
        ]
      }
    ]
  },
  {
    day: 24,
    dayWiseTestcase: [
      {
        fileName: [
          "day_24.spec.ts"
        ],
        testcases: [
          {
            "name": "DashboardComponent should create the component",
            "value": "Dashboard Component should create the component"
          },
          {
            "name": "DashboardComponent should fetch student details on initialization",
            "value": "Dashboard Component should fetch student details on initialization"
          },
          {
            "name": "DashboardComponent should fetch courses and enrollments for a student",
            "value": "Dashboard Component should fetch courses and enrollments for a student"
          },
          {
            "name": "DashboardComponent should handle error when fetching student details",
            "value": "Dashboard Component should handle error when fetching student details"
          },
          {
            "name": "StudentEditComponent should create the component",
            "value": "Student Edit Component should create the component"
          },
          {
            "name": "StudentEditComponent should initialize the form on ngOnInit",
            "value": "Student Edit Component should initialize the form on ngOnInit"
          },
          {
            "name": "StudentEditComponent should load student details on loadStudentDetails",
            "value": "Student Edit Component should load student details on loadStudentDetails"
          },
          {
            "name": "StudentEditComponent should load user details on loadStudentDetails",
            "value": "Student Edit Component should load user details on loadStudentDetails"
          },
          {
            "name": "StudentEditComponent should submit valid form and call updateStudent API",
            "value": "Student Edit Component should submit valid form and call updateStudent API"
          }
        ]
      }
    ]
  },
  {
    day: 25,
    dayWiseTestcase: [
      {
        fileName: [
          "day_25.spec.ts"
        ],
        testcases: [
          {
            "name": "TeacherEditComponent should create the component",
            "value": "Teacher Edit Component should create the component"
          },
          {
            "name": "TeacherEditComponent should initialize the form and load teacher details",
            "value": "Teacher Edit Component should initialize the form and load teacher details"
          },
          {
            "name": "TeacherEditComponent should submit valid form and call updateTeacher API",
            "value": "Teacher Edit Component should submit valid form and call updateTeacher API"
          },
          {
            "name": "TeacherEditComponent should handle error when loading teacher details fails",
            "value": "Teacher Edit Component should handle error when loading teacher details fails"
          },
          {
            "name": "DashboardComponent should create the component",
            "value": "Dashboard Component should create the component "
          },
          {
            "name": "DashboardComponent should delete a teacher",
            "value": "Dashboard Component should delete a teacher"
          },
          {
            "name": "DashboardComponent should delete a course",
            "value": "Dashboard Component should delete a course"
          }
        ]
      }
    ]
  }
]

module.exports = {
  noOfDay,
  testSuites
};

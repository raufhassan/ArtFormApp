import {
  GET_USER,
  GET_ID,
  GET_DEPENDENTS,
  GET_REMARKS,
  REMOVE_DATA,
} from "./types";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "UserDatabase.db" });
export const personalInfo = (userData) => {
  if (userData) {
    return {
      type: GET_USER,
      payload: userData,
    };
  } else {
    console.log("no data");
  }
};
export const DependentInfo = (data) => {
  if (data) {
    return {
      type: GET_DEPENDENTS,
      payload: data,
    };
  } else {
    console.log("no data");
  }
};
export const Remarks = (data) => {
  if (data) {
    return {
      type: GET_REMARKS,
      payload: data,
    };
  } else {
    console.log("no data");
  }
};

export const saveID = (id) => {
  /*  return {
    type: REMOVE_DATA,
    payload: null,
  }; */
  return {
    type: GET_ID,
    payload: id,
  };
};

export const insertUser = (user, dependent, userID, remarks) => (dispatch) => {
  console.log("called");
  var selectedFor = JSON.stringify(remarks.selectedFor);
  var images = JSON.stringify(remarks.imagesUri);
  var houseOwn = JSON.stringify(user.houseOwn);
  var monthlyRent = parseInt(user.monthlyRent);

  db.transaction((tx) => {
    // Loop would be here in case of many values
    tx.executeSql(
      "INSERT INTO user (user_id,cnic_image, first_name, last_name, gender, guardian, religion, zakat, DOB, marital_status, husband_status, husband_profession, husband_income, husband_company, husband_unemp_type, husband_unemp_reason, address, house_ownership, monthly_rent, town, area, profession, emp_status, monthly_income, skills, rent_exp, education_exp, utility_exp, overall_income, family_is, family_registered,disease, remarks, images) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        userID,
        user.cnic,
        user.first_name,
        user.last_name,
        user.gender,
        user.guardian,
        user.Religion,
        user.zakat,
        user.date,
        user.RelStatus,
        user.HbState,
        user.Hbprofession,
        user.Hbincome,
        user.Hbcompany,
        user.HbUnemp,
        user.HbReason,
        user.Address,
        houseOwn,
        monthlyRent,
        user.Town,
        user.Area,
        user.profession,
        user.empStatus,
        user.MonthlyIncome,
        user.skills,
        dependent.Rent,
        dependent.EducationExp,
        dependent.Utility,
        dependent.OverallIncome,
        remarks.familyIs,
        selectedFor,
        remarks.disease,
        remarks.Remarks,
        images,
      ],
      (tx, results) => {
        console.log("Insert Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          dispatch({
            type: REMOVE_DATA,
            payload: null,
          });
          console.log("insertion successfull");
        } else {
          console.log(" Failed");
        }
      },
      (tx, err) => {
        console.log("error", err);
      }
    );
  });
  /*   return {
    type: GET_ID,
    payload: null,
  }; */
};
export const insertDependents = (dependents, userID) => {
  db.transaction((tx) => {
    // Loop would be here in case of many values
    for (let i = 0; i < dependents.length; i++) {
      tx.executeSql(
        "INSERT INTO dependents (user_id,dep_name,dep_relation,dep_DOB,dep_education,dep_income,councelling,education) VALUES (?,?,?,?,?,?,?,?)",
        [
          userID,
          dependents[i].name,
          dependents[i].Relation,
          dependents[i].DOB,
          dependents[i].Education,
          dependents[i].income,
          dependents[i].councelling,
          dependents[i].EducationSupport,
        ],
        // "SELECT * FROM dependents",
        // [],
        (tx, results) => {
          console.log("Insert Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("insertion successfull");
            // insert = true;
          } else {
            console.log(" Failed");
          }
        },
        (tx, err) => {
          console.log("error", err);
          console.log(i);
        }
      );
    }
  });
  return {
    type: GET_ID,
    payload: null,
  };
};

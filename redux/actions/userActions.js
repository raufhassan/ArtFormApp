import { GET_USER, GET_ID, GET_DEPENDENTS, GET_REMARKS } from "./types";
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
  /*  if (userData) {
    dispatch({
      type: GET_ID,
      payload: id,
    });
  } */
  return {
    type: GET_ID,
    payload: id,
  };
};

export const insertUser = (data) => {
  db.transaction((tx) => {
    // Loop would be here in case of many values
    tx.executeSql(
      "INSERT INTO table_user (user_id, cnic_image, first_name, last_name, gender,guardian,religion,zakat,DOB,marital_status,husband_status,husband_profession,husband_income,husband_company,husband_unemp_type,husband_unemp_reason,address,house_ownership,monthly_rent,town,area,profession,emp_status,monthly_income,skills,rent_exp,education_exp,utility_exp,overall_income,family_is,family_registered,remarks,images ) VALUES (?,?,?,?)",
      [data.id, data.name, data.contact, data.email],
      (tx, results) => {
        console.log("Insert Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log("insertion successfull");
          // insert = true;
        } else {
          console.log(" Failed");
        }
      }
    );
  });
  return {
    type: GET_ID,
    payload: null,
  };
};
export const insertDependents = (data) => {
  db.transaction((tx) => {
    // Loop would be here in case of many values
    tx.executeSql(
      "INSERT INTO table_user (dep_id,dep_name,dep_relation,dep_DOB,dep_education,dep_income,councelling,education) VALUES (?,?,?,?)",
      [data.id, data.name, data.contact, data.email],
      (tx, results) => {
        console.log("Insert Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log("insertion successfull");
          // insert = true;
        } else {
          console.log(" Failed");
        }
      }
    );
  });
};

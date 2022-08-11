export class Loggeduser {
  aadhaar:any
dob: any
firstname: any
lastname: any
mobile: any
password:any
priviledge:any
user_id:any
}
export class Loggerdata{
  city:any
city_id:any
date: any
dosage: any
firstname:any
slot:any
status:any
taken_date: any
user_id: any
}
export class AllInOne{
  theUser:Loggeduser
  userDetails=[Loggerdata]
}
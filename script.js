var firebaseConfig = {
    apiKey: "AIzaSyBfzVWTUubovptlLNu7tbEkP8Rnt21sceA",
    authDomain: "angular-5b97d.firebaseapp.com",
    databaseURL: "https://angular-5b97d-default-rtdb.firebaseio.com",
    projectId: "angular-5b97d",
    storageBucket: "angular-5b97d.appspot.com",
    messagingSenderId: "72718290592",
    appId: "1:72718290592:web:cd50fdb5cbd9ad7b1243c5",
    measurementId: "G-3JHEZ9PC5Y"
  };
  // Initialize Firebase
//   https://console.firebase.google.com/u/0/project/angular-5b97d/settings/general/web:MDMzZjNjYzktZDlkNC00ZmY5LWFhNzktNzZkNjczZjI4YjI0
  firebase.initializeApp(firebaseConfig);

function sending(){

    if(document.getElementById("patient").value == "" ){
        alert("Enter Patient name");
        return
    }
    if(document.getElementById("mobile").value == "" ){
        alert("Enter Mobile number");
        return
    }
    if(document.getElementById("age").value == "" ){
        alert("Enter patient age");
        return
    }
    if(document.getElementById("address").value == "" ){
        alert("Enter Address");
        return
    }
    if(document.getElementById("symptoms").value == "" ){
        alert("Enter Symptoms feild");
        return
    }
    if(document.getElementById("spo1").value == "" ){
        alert("SPO2 Level without oxygen feild otherwise type three zeros");
        return
    }
    if(document.getElementById("spo2").value == "" ){
        alert("SPO2 Level with oxygen feild otherwise type three zeros");
        return
    }
    if(document.getElementById("oxygenday").value == "" ){
        document.getElementById("oxygenday").value = '-'
    }
    if(document.getElementById("attmobile").value == "" ){
        alert("Enter Attender mobile no feild otherwise type three zeros and continue :)");
        return
    }
    if(document.getElementById("relation").value == "" ){
        alert("Enter Relation to patient feild otherwise type - in the field to continue :)");
        return
    }
    if(document.getElementById("bno").value == "" ){
        alert("Enter BU number feild otherwise type three zeros and continue :)");
        return
    }
    if(document.getElementById("sno").value == "" ){
        alert("Enter SRF ID feild otherwise type three zeros and continue :)");
        return
    }
  
    var patient = document.getElementById("patient").value;
    var mobile = document.getElementById("mobile").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var symptoms = document.getElementById("symptoms").value;
    var spo1 = document.getElementById("spo1").value;
    var spo2 = document.getElementById("spo2").value;
    var oxygenday = document.getElementById("oxygenday").value;
    var attmobile = document.getElementById("attmobile").value 
    var relation = document.getElementById("relation").value
    var bno = document.getElementById("bno").value;
    var sno = document.getElementById("sno").value; 
    var gender = document.getElementById("gender").value; 
    var covidstatus = document.getElementById("covidTest").value;
    var hospital = document.getElementById("hospital").value;
    var covidOxy = document.getElementById("covidOxy").value;

    sent(patient, mobile, age, address, symptoms, spo1, spo2, oxygenday, attmobile,
       relation, bno, sno, gender, hospital, covidOxy, covidstatus
    );
}
function sent(patient, mobile, age, address, symptoms, spo1, spo2, oxygenday, attmobile, relation, bno, sno, gender, hospital, covidOxy, covidstatus )
{
    var covidPatient = {
        PatientName: patient,
        MobileNo: mobile,
        Age: age,
        Address: address,
        Symptoms: symptoms,
        SPO1: spo1,
        SPO2: spo2,
        OxygenDay: oxygenday,
        AttenderMobile: attmobile,
        Relation: relation,
        BUno: bno,
        SRFID: sno,
        Gender: gender,
        Hospital: hospital,
        OxyCylinder: covidOxy,
        covidstatus: covidstatus
    }
   
    let db = firebase.firestore().collection("CovidTaskForce/");
      db.add(covidPatient).then(()=>{
        Swal.fire(
            'good job!',
            'Patient Added!', 
            'Success')
    });
    reset();
}

function reset(){
    document.getElementById("patient").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("symptoms").value = "";
    document.getElementById("spo1").value = "";
    document.getElementById("spo2").value = "";
    document.getElementById("oxygenday").value = "";
    document.getElementById("attmobile").value = "";
    document.getElementById("relation").valu = "";
    document.getElementById("bno").value = "";
    document.getElementById("sno").value = "";
    // document.getElementById("gender").value = "";
    document.getElementById("covidstatus").value = "";
    // document.getElementById("hospital").value  = "";
    // document.getElementById("covidOxy").value = "";
  
}
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
function readTask(){
    firebase.firestore().collection("tasks").onSnapshot(function(snapshot){
      document.getElementById("cardSection").innerHTML="";
      snapshot.forEach(function(taskValue){
          document.getElementById("cardSection").innerHTML +=`
        <div class="card mb-3">
          <div class="card-body">
              <h5 class="card-title">${taskValue.data().task}</h5>
              <p class="card-test">${taskValue.data().description}</p>
              <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(
                  '${taskValue.id}','${taskValue.data().task}', '${taskValue.data().description}'
              )">Edit Task</button>
              <button type="submit" class="btn btn-danger" onclick="deleteTask('${taskValue.id}')">
              delete</button>
          </div>
         </div>`
      });
        
    });
}
function patientDetails(){
    let arr = [];
    document.getElementById("load").style.display = "block";
    debugger 
    firebase.firestore().collection("CovidTaskForce").onSnapshot(function(snapshot){
        snapshot.forEach(function(taskValue){
            var id = taskValue.id;
            var patient =  {
                id: id,
                PatientName: taskValue.data().PatientName,
                MobileNo: taskValue.data().MobileNo,
                Age: taskValue.data().Age,
                Address: taskValue.data().Address,
                Symptoms: taskValue.data().Symptoms,
                SPO1: taskValue.data().SPO1,
                SPO2: taskValue.data().SPO2,
                OxygenDay: taskValue.data().OxygenDay,
                AttenderMobile: taskValue.data().AttenderMobile,
                Relation: taskValue.data().Relation,
                BUno: taskValue.data().BUno,
                SRFID: taskValue.data().SRFID,
                Gender: taskValue.data().Gender,
                Hospital: taskValue.data().Hospital,
                OxyCylinder: taskValue.data().OxyCylinder,
                covidstatus: taskValue.data().covidstatus
            }
            arr.push(patient)
            console.log(patient)
            
        })
        console.log(arr, arr[0])
        document.getElementById("patients").innerHTML="";
        debugger
        for(let i = 0; i < arr.length; i++){
            document.getElementById("patients").innerHTML +=`
            
                <div class="card mb-3">
                    <div class="card-body">
                    <h5 class="card-title">Patient Name: ${arr[i].PatientName}</h5>
                    <p class="card-test">Address: ${arr[i].Address}</p>
                    <button type="submit" style="color:white" class="btn btn-success" 
                    onclick="showMore('${arr[i].id}')">More details here</button>
                    </div>
                 </div>`
        }
        document.getElementById("load").style.display = "none"; 
    })
    
}
function showMore(idOfparticular){
    document.getElementById("load").style.display = "block";
    let arr = [];
    var ParticularPatient = [];
    firebase.firestore().collection("CovidTaskForce").onSnapshot(function(snapshot){
        snapshot.forEach(function(taskValue){
            var id = taskValue.id;
            var patient =  {
                id: id,
                PatientName: taskValue.data().PatientName,
                MobileNo: taskValue.data().MobileNo,
                Age: taskValue.data().Age,
                Address: taskValue.data().Address,
                Symptoms: taskValue.data().Symptoms,
                SPO1: taskValue.data().SPO1,
                SPO2: taskValue.data().SPO2,
                OxygenDay: taskValue.data().OxygenDay,
                AttenderMobile: taskValue.data().AttenderMobile,
                Relation: taskValue.data().Relation,
                BUno: taskValue.data().BUno,
                SRFID: taskValue.data().SRFID,
                Gender: taskValue.data().Gender,
                Hospital: taskValue.data().Hospital,
                OxyCylinder: taskValue.data().OxyCylinder,
                covidstatus: taskValue.data().covidstatus
            }
            arr.push(patient)
            console.log(patient)
            
        })
        for(let i = 0; i < arr.length; i++){
            if(arr[i].id == idOfparticular ){
                ParticularPatient.push(arr[i])
            }
        }
        console.log(ParticularPatient);
        document.getElementById("onepatient").style.display = "block"; 
        document.getElementById("patients").style.display = "none";                   
        document.getElementById("onepatient").innerHTML = `
        <h4>Details of Patient ${ParticularPatient[0].PatientName}</h4>
        <table class="table table-striped">
    <thead>  
      <tr>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>PatientName:</th>
        <th>
        ${ParticularPatient[0].PatientName}</th>
      </tr> 
      <tr>
      <td>Covid Status:</td>
      <td>
      ${ParticularPatient[0].covidstatus}</td>
    </tr>
      <tr>
        <td>Gender:</td>
        <td>
        ${ParticularPatient[0].Gender}</td>
      </tr>
      <tr>
        <td> MobileNo:</td>
        <td> ${ParticularPatient[0].MobileNo}</td>
      </tr>
      <tr>
        <td>Age: </td>
        <td>${ParticularPatient[0].Age}</td>
      </tr>
      <tr>
        <td>Address:</td>
        <td>${ParticularPatient[0].Address}</td>
      </tr>
      <tr>
        <td>Symptoms: </td>
        <td>${ParticularPatient[0].Symptoms}</td>
      </tr>
      <tr>
        <td>SPO2 Level without oxygen: </td>
        <td>${ParticularPatient[0].SPO1}</td>
      </tr>
      <tr>
        <td>SPO2 Level with oxygen: </td>
        <td>${ParticularPatient[0].SPO2}</td>
      </tr>
      <tr>
        <td>Is patient on oxygen cylinder: </td>
        <td>${ParticularPatient[0].OxyCylinder}</td>
      </tr>
      <tr>
        <td>Since how many days?: </td>
        <td>${ParticularPatient[0].OxygenDay}</td>
      </tr>
      <tr>
        <td>Attender mobile no: </td>
        <td>${ParticularPatient[0].AttenderMobile}</td>
      </tr>
      <tr>
        <td>Relation to patient: </td>
        <td>${ParticularPatient[0].Relation}</td>
      </tr>
      <tr>
        <td>Preferable hospital: </td>
        <td>${ParticularPatient[0].Hospital}</td>
      </tr>
      <tr>
        <td>BU number: </td>
        <td>${ParticularPatient[0].BUno}</td>
      </tr>
      
      <tr>
        <td>SRF ID: </td>
        <td>${ParticularPatient[0].SRFID}</td>
      </tr> 
      
    </tbody>
  </table>
  <button class="btn btn-block btn-danger" onclick="closefun();"> Back to patient details </button>
        `;  


    })
    document.getElementById("load").style.display = "none";
}
function closefun(){
    debugger
    document.getElementById("onepatient").style.display = "none";
    document.getElementById("patients").style.display = "block";                   
    
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
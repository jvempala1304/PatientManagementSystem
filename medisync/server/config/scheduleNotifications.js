const schedule = require("node-schedule");
const sendNotification = require("../firebase/firebaseNotification");
function scheduleNotifications(appointments) {
  appointments.forEach((appointment) => {
    const {
      patientName,
      doctorName,
      clinicName,
      appointmentDateTime,
      fcmToken,
    } = appointment;
    const appointmentTime = new Date(appointmentDateTime);
    const notificationTime = new Date(
      appointmentTime.getTime() - 60 * 60 * 1000
    );
    schedule.scheduleJob(notificationTime, () => {
      const title = `${clinicName} Appointment`;
      const body = `Hello ${patientName}, you have an appointment with Dr. ${doctorName} at ${appointmentTime.toLocaleTimeString()}. Please arrive on time.`;
      sendNotification(fcmToken, title, body);
    });

    console.log(
      `Scheduled notification for ${patientName} at ${notificationTime.toLocaleString()}`
    );
  });
}
const appointments = [
  {
    patientName: "James Boby Vempala",
    doctorName: "Smith",
    clinicName: "Smile Dental",
    appointmentDateTime: "2024-11-25T20:10:00",
    fcmToken:
      "fhbFajqmmyjtwXGuzvKOa-:APA91bHfVmTV6p6QKCAhPdSoy8D0l9Qe8sJxBzm25NoaeThSpSW2bjnQZUdteBgzkRlfOpqmwJHyV3Ts1PGKaqqfqg61xvQpZ6OTMFOkkyI3KMxWjamsodA",
  },
  {
    patientName: "Firefox James",
    doctorName: "Khaled",
    clinicName: "Comfort Labs",
    appointmentDateTime: "2024-11-25T20:11:00",
    fcmToken:
      "flxYzKZ2hkjhlCL4npCXp1:APA91bEBbhMiBxil7RRRLh6K7o4t7yNozZoNfcSQbvQ3Aq7ytdi_tudeHnh7zZVsEiwKE9YbPxGvssWC2aM3WwrwIM1xHtTEzVHf19lrPGShruQCUkqDyds",
  },
];
scheduleNotifications(appointments);

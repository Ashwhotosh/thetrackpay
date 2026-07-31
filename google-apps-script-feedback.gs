function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Q1 UPI Apps Used",
      "Q2 Why These Apps",
      "Q3 Problems Faced",
      "Q4 Tracks Shared Expenses",
      "Q5 Missed Tax Deduction",
      "Q6 Features Interested In",
      "Q7 Artha AI Areas",
      "Q8 Trust AI For Idle Money",
      "Q9 Competitor Apps Used",
      "Q10 Wish Feature",
      "Q12 Likelihood To Use (1-5)",
      "Q13 First Impression",
      "Q14 Feature Suggestion",
      "Q15 Wants Early Access",
      "Q16 Email"
    ]);
  }

  sheet.appendRow([
    new Date(),
    (data.q1 || []).join(", "),
    (data.q2 || []).join(", "),
    (data.q3 || []).join(", "),
    data.q4 || "",
    data.q5 || "",
    (data.q6 || []).join(", "),
    (data.q7 || []).join(", "),
    data.q8 || "",
    (data.q9 || []).join(", "),
    data.q10 || "",
    data.q12 || "",
    data.q13 || "",
    data.q14 || "",
    data.q15 || "",
    data.q16 || ""
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

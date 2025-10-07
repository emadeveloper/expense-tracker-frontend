import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      padding: 20,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableRowOdd: {
      backgroundColor: "#e5e5e5",
    },
    tableRowEven: {
      backgroundColor: "#ffffff",
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#ccc",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      padding: 5,
    },
    tableHeaderCol: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#fff",
      borderBottomWidth: 2,
      padding: 5,
      backgroundColor: "#155dfc",
    },
    tableHeaderText: {
      textAlign: "center",
      fontSize: 12,
      color: "#fff",
      fontWeight: "bold",
    },
    text: {
      fontSize: 10,
      wordBreak: "break-word",
    },
  });
  
  

const MyDocument = ({ data = [], title }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center" }}>
        {title === "expenses" ? "Expenses Report" : "Incomes Report"}
      </Text>

      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableRow}>
          {["Title", "Category", "Description", "Amount", "Date"].map(
            (header, i) => (
              <View key={i} style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderText}>{header}</Text>
              </View>
            )
          )}
        </View>

        {/* Rows */}
        {data.map((item, index) => (
          <View key={index} style={[
            styles.tableRow,
            index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
          ]}>
            <View style={styles.tableCol}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>{item.category}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>{item.description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>${item.amount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>{item.date}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {title === "expenses" ? "Total Expenses" : "Total Incomes" } ${data.reduce((acc, curr) => acc + curr.amount, 0)}
      </Text>
    </Page>
  </Document>
);

const ExportPdfButton = ({ data, title }) => (
  <PDFDownloadLink
    document={<MyDocument data={data} title={title}/>}
    fileName= {title === "expenses" ? "expenses_report.pdf" : "incomes_report.pdf"}
    className="no-underline cursor-pointer"
  >
    {({ loading }) =>
      loading ? (
        <button className="px-4 py-2 bg-gray-400 text-white rounded-lg">
          Generating PDF...
        </button>
      ) : (
        <button className="flex justify-center items-center cursor-pointer text-sm px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-colors">
          Download PDF
        </button>
      )
    }
  </PDFDownloadLink>
);

export default ExportPdfButton;

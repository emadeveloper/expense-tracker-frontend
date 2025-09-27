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
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: "1px solid #ccc",
  },
});

const MyDocument = ({ data }) => {
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Transaction List</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text>{item.title}</Text>
          <Text>{item.category}</Text>
          <Text>{item.description}</Text>
          <Text>amount: ${item.amount}</Text>
          <Text>Date{item.date}</Text>
        </View>
      ))}
      ;
    </Page>
  </Document>;
};

const ExportPdfButton = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<MyDocument data={data} />}
      fileName="my_transactions.pdf"
    >
      {({ loading }) =>
        loading ? (
          <button className="px-4 py-2 bg-gray-400 text-white rounded-lg">
            Generating PDF...
          </button>
        ) : (
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
            Download PDF
          </button>
        )
      }
    </PDFDownloadLink>
  );
};

export default ExportPdfButton;

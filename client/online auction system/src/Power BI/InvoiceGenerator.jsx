import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import "./InvoiceGenerator.css";

function InvoiceGenerator() {
  const [buyer, setBuyer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerAndTransactions = async () => {
      try {
        const buyerResponse = await axios.get("http://localhost:3000/buyers/1");
        const transactionsResponse = await axios.get(
          "http://localhost:3000/transactions?buyer_id=1"
        );

        setBuyer(buyerResponse.data);
        setTransactions(transactionsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBuyerAndTransactions();
  }, []);

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  const totalAmount = transactions.reduce(
    (acc, curr) => acc + curr.Transaction_Amount,
    0
  );

  // PDF styles cannot be moved to CSS, keep here
  const pdfStyles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      fontFamily: "Helvetica",
    },
    section: {
      marginBottom: 20,
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    label: {
      fontWeight: "bold",
      width: "30%",
    },
    value: {
      width: "70%",
    },
    tableHeader: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      borderBottomStyle: "solid",
      paddingBottom: 4,
      marginBottom: 6,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 0.5,
      borderBottomColor: "#ccc",
      borderBottomStyle: "solid",
      paddingVertical: 4,
    },
    tableColItem: {
      width: "50%",
      paddingRight: 8,
    },
    tableColAmount: {
      width: "25%",
      textAlign: "right",
      paddingRight: 8,
    },
    tableColTime: {
      width: "25%",
      textAlign: "right",
    },
    total: {
      marginTop: 10,
      fontWeight: "bold",
      fontSize: 14,
      textAlign: "right",
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.header}>Invoice for {buyer?.Username}</Text>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Email:</Text>
              <Text style={pdfStyles.value}>{buyer?.Email}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Address:</Text>
              <Text style={pdfStyles.value}>{buyer?.Address}</Text>
            </View>
          </View>

          <View style={pdfStyles.section}>
            <Text style={pdfStyles.header}>Transaction Details</Text>

            {/* Table Header */}
            <View style={pdfStyles.tableHeader}>
              <Text style={pdfStyles.tableColItem}>Item Name</Text>
              <Text style={pdfStyles.tableColAmount}>Amount</Text>
              <Text style={pdfStyles.tableColTime}>Transaction Time</Text>
            </View>

            {/* Table Rows */}
            {transactions.map((transaction) => (
              <View key={transaction.Transaction_ID} style={pdfStyles.tableRow}>
                <Text style={pdfStyles.tableColItem}>
                  {transaction.Item_Name}
                </Text>
                <Text style={pdfStyles.tableColAmount}>
                  ${transaction.Transaction_Amount.toFixed(2)}
                </Text>
                <Text style={pdfStyles.tableColTime}>
                  {new Date(transaction.Transaction_Time).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={pdfStyles.total}>
              Total Amount: ${totalAmount.toFixed(2)}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default InvoiceGenerator;

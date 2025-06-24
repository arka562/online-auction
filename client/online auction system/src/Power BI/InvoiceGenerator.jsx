import React, { useState, useEffect } from "react";
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
        const buyerRes = await fetch("http://localhost:3000/buyers/1");
        const transactionsRes = await fetch(
          "http://localhost:3000/transactions?buyer_id=1"
        );

        if (!buyerRes.ok || !transactionsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const buyerData = await buyerRes.json();
        const transactionData = await transactionsRes.json();

        setBuyer(buyerData);
        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
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

            <View style={pdfStyles.tableHeader}>
              <Text style={pdfStyles.tableColItem}>Item Name</Text>
              <Text style={pdfStyles.tableColAmount}>Amount</Text>
              <Text style={pdfStyles.tableColTime}>Transaction Time</Text>
            </View>

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

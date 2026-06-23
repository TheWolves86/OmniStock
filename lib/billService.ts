import db from "./database"

//save the invoice and its info into the database
export const saveBill = (
    bill: {
        invoiceNumber: string;
        paymentMethod: string;
        subtotal: number;
        gstTotal: number;
        grandTotal: number;
        createdAt: string;
        customerName: string;
        customerPhone: string;
        customerAddress: string;
    },
    items: any[]
) => {
    //it saves the bill summary info
    const result = db.runSync(
        `
        INSERT INTO bills (
            invoiceNumber,
            paymentMethod,
            subtotal,
            gstTotal,
            grandTotal,
            createdAt,
            customerName,
            customerPhone,
            customerAddress
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            bill.invoiceNumber,
            bill.paymentMethod,
            bill.subtotal,
            bill.gstTotal,
            bill.grandTotal,
            bill.createdAt,
            bill.customerName,
            bill.customerPhone,
            bill.customerAddress
        ]
    );

    //get the bill id
    const billId = result.lastInsertRowId;

    //save every product info that belongs to the bill
    items.forEach((item) => {
        db.runSync(
            `
            INSERT INTO bill_items (
                billId,
                productId,
                productName,
                price,
                quantity,
                gstRate,
                lineTotal
            )
            Values (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                billId,
                item.id,
                item.name,
                item.price,
                item.quantity,
                item.gstRate,
                item.price * item.quantity
            ]
        );
    });
};

//get all the products that are inside a specific bill
export const getBills = () => {
    return db.getAllSync(
        `
        SELECT *
        FROM bills
        ORDER BY id DESC
        `
    )
}

export const getBillsItems = (billId: number) => {
    return db.getAllSync(
        `
        SELECT *
        FROM bill_items
        WHERE billId = ?
        `,
        [billId]
    );
}
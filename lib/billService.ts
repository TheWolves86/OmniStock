import db from "./database"

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

    const billId = result.lastInsertRowId;

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

export const getBills = () => {
    return db.getAllSync(
        `
        SELECT *
        FROM bills
        ORDER BY id DESC
        `
    )
}
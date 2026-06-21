import db from "./database"

export const saveBill = (
    bill: {
        invoiceNumber: string;
        paymentMethod: string;
        subtotal: number;
        gstTotal: number;
        grandTotal: number;
        createdAt: string
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
            createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            bill.invoiceNumber,
            bill.paymentMethod,
            bill.subtotal,
            bill.gstTotal,
            bill.grandTotal,
            bill.createdAt
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
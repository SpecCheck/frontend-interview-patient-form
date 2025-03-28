import { type NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders, type Order } from "@/lib/storage";

// GET /api/orders - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const orders = readOrders();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { firstName, lastName, email, orderType, orderOptions } = body;

    if (!firstName || !lastName || !email || !orderType || !orderOptions) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const orders = readOrders();

    // Create new order
    const newOrder: Order = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      orderType,
      orderOptions,
      createdAt: new Date(),
      status: "pending",
    };

    // Add to our "database"
    orders.push(newOrder);
    writeOrders(orders);

    return NextResponse.json({ order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// PUT /api/orders/:id - Update an order
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = params;
    const orders = readOrders();

    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Update the order
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      updatedAt: new Date(),
    };

    writeOrders(orders);
    return NextResponse.json({ order: orders[orderIndex] }, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/:id - Delete an order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const orders = readOrders();

    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Remove the order
    orders.splice(orderIndex, 1);
    writeOrders(orders);

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}

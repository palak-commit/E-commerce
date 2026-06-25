"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

function fmt(p: number) {
  return new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(p / 100);
}

const STATES = ["Delhi","Mumbai","Bengaluru","Chennai","Hyderabad","Kolkata","Pune","Ahmedabad","Jaipur","Lucknow","Other"];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", city:"", state:"Delhi", pin:"" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const delivery = totalPrice >= 49900 ? 0 : 4900;
  const grandTotal = totalPrice + delivery;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone.replace(/\D/g,"").length < 10) e.phone = "Valid 10-digit phone required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!/^\d{6}$/.test(form.pin)) e.pin = "Valid 6-digit PIN code required";
    return e;
  }

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    router.push("/checkout/success");
  }

  useEffect(() => {
    if (items.length === 0) router.push("/cart");
  }, [items.length, router]);

  if (items.length === 0) return null;

  const field = (label: string, key: keyof typeof form, type = "text", placeholder = "") => (
    <div>
      <label style={{ display:"block", fontWeight:600, fontSize:"0.875rem", marginBottom:"0.375rem" }}>{label}</label>
      <input
        type={type} className="input" placeholder={placeholder}
        value={form[key]} onChange={e => { setForm(f=>({...f,[key]:e.target.value})); setErrors(err=>({...err,[key]:""})); }}
      />
      {errors[key] && <p style={{ color:"var(--error)", fontSize:"0.78rem", marginTop:"0.25rem" }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div className="animate-fade-up">
      <h1 style={{ fontSize:"1.75rem", fontWeight:800, marginBottom:"1.5rem", letterSpacing:"-0.02em" }}>Checkout</h1>
      <form onSubmit={handleOrder}>
        <div style={{ display:"grid", gap:"2rem", gridTemplateColumns:"1fr" }} className="checkout-grid">
          {/* Left: form */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
            {/* Contact */}
            <div style={{ padding:"1.5rem", background:"var(--surface)", borderRadius:"var(--radius-lg)", border:"1px solid var(--border)" }}>
              <h2 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"1rem" }}>📋 Contact Information</h2>
              <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"1fr 1fr" }}>
                {field("Full Name","name","text","Riya Sharma")}
                {field("Email","email","email","riya@example.com")}
              </div>
              <div style={{ marginTop:"1rem" }}>
                {field("Phone","phone","tel","9876543210")}
              </div>
            </div>

            {/* Shipping */}
            <div style={{ padding:"1.5rem", background:"var(--surface)", borderRadius:"var(--radius-lg)", border:"1px solid var(--border)" }}>
              <h2 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"1rem" }}>📦 Shipping Address</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {field("House / Flat / Street","address","text","123, Lajpat Nagar")}
                <div style={{ display:"grid", gap:"1rem", gridTemplateColumns:"1fr 1fr" }}>
                  {field("City","city","text","New Delhi")}
                  <div>
                    <label style={{ display:"block", fontWeight:600, fontSize:"0.875rem", marginBottom:"0.375rem" }}>State</label>
                    <select className="input" value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value}))}>
                      {STATES.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                {field("PIN Code","pin","text","110024")}
              </div>
            </div>

            {/* Payment */}
            <div style={{ padding:"1.5rem", background:"var(--surface)", borderRadius:"var(--radius-lg)", border:"1px solid var(--border)" }}>
              <h2 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"1rem" }}>💳 Payment Method</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                {[["upi","🔵 UPI / GPay / PhonePe"],["card","💳 Credit / Debit Card"],["cod","🏠 Cash on Delivery"]].map(([val,label])=>(
                  <label key={val} style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.875rem 1rem", borderRadius:"var(--radius)", border: payment===val ? "2px solid var(--primary)" : "1.5px solid var(--border)", background: payment===val ? "#eef2ff" : "#fff", cursor:"pointer", fontWeight:600, fontSize:"0.9rem" }}>
                    <input type="radio" name="payment" value={val} checked={payment===val} onChange={()=>setPayment(val)} style={{ accentColor:"var(--primary)" }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: summary */}
          <div style={{ padding:"1.5rem", background:"var(--surface)", borderRadius:"var(--radius-lg)", border:"1px solid var(--border)", height:"fit-content" }}>
            <h2 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"1rem" }}>Order Summary</h2>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"0.5rem", marginBottom:"1rem" }}>
              {items.map(item=>(
                <li key={`${item.id}-${item.size}`} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.875rem" }}>
                  <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"60%" }}>{item.name}{item.size?` (${item.size})`:""} ×{item.quantity}</span>
                  <span style={{ fontWeight:600 }}>{fmt(item.priceInPaise*item.quantity)}</span>
                </li>
              ))}
            </ul>
            <hr className="divider" style={{ margin:"0.75rem 0" }} />
            <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem", fontSize:"0.875rem", marginBottom:"1rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}><span>Subtotal</span><span>{fmt(totalPrice)}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between" }}><span>Delivery</span><span style={{ color: delivery===0?"var(--success)":"var(--fg)" }}>{delivery===0?"FREE":fmt(delivery)}</span></div>
            </div>
            <hr className="divider" style={{ margin:"0.75rem 0" }} />
            <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:"1.1rem", marginBottom:"1.25rem" }}>
              <span>Total</span><span style={{ color:"var(--primary)" }}>{fmt(grandTotal)}</span>
            </div>
            <button type="submit" className="btn-accent" style={{ width:"100%", fontSize:"1rem", padding:"1rem" }} disabled={loading}>
              {loading ? <span className="animate-spin" style={{ display:"inline-block" }}>⏳</span> : `Place Order — ${fmt(grandTotal)}`}
            </button>
            <p style={{ fontSize:"0.78rem", color:"var(--fg-muted)", textAlign:"center", marginTop:"0.75rem" }}>🔒 Your payment info is secure & encrypted</p>
          </div>
        </div>
      </form>
      <style>{`@media(min-width:768px){.checkout-grid{grid-template-columns:1fr 340px !important;}}`}</style>
    </div>
  );
}

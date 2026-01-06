export default function CancelPage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Payment Canceled</h1>
      <p>No worries — you weren’t charged.</p>
      <a href="/choose-plan">Try again</a>
    </div>
  );
}

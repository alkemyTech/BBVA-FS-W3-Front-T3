import InvestmentCard from "../InvestmentCard.jsx";

export default function LoanCard() {
  return (
    <InvestmentCard
      title="Prestamo"
      description="Solicita un prestamo"
      image="src/assets/loan.jpg"
      alt="prestamo"
      action="Pedir"
      actionPath="/inversiones/prestamo"
      simulatePath="/inversiones/simularprestamo"
    />
  );
}

import InvestmentCard from "../InvestmentCard.jsx";

export default function FixedTermDepositCard() {
  return (
    <InvestmentCard
      title="Plazo Fijo"
      description="Pide un plazo fijo"
      image="src/assets/fixeddeposit.jpg"
      alt="plazo fijo"
      action="Crear"
      actionPath="/inversiones/plazofijo"
      simulatePath="/inversiones/simularplazofijo"
    />
  );
}

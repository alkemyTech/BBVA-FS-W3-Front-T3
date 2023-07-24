import InvestmentCard from "../InvestmentCard.jsx";

export default function ExchangeCard() {
  return (
    <InvestmentCard
      title="Compra/Venta de Dolares"
      description="Compra o vende dolares"
      image="src/assets/exchange.png"
      alt="exchange"
      action="Operar"
      actionPath="/inversiones/exchange"
      simulatePath="/inversiones/simularexchange"
    />
  );
}

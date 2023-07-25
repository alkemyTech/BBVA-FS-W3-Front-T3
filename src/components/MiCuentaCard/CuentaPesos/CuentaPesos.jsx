import MiCuentaCard from "../MiCuentaCard";

export default function CuentaDolaresCard() {
  return (
    <MiCuentaCard
      title="CUENTA EN PESOS"
      description="Mira tus pesos"
      image="src/assets/pesosarg.jpg"
      alt="Pesos"
      cvu= "2232432423"
      transactionLimit= "300.000"
      balance = "3540"
    />
  );
}
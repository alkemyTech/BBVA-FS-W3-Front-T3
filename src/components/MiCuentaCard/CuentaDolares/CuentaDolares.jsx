import MiCuentaCard from "../MiCuentaCard";

export default function CuentaDolaresCard() {
  return (
    <MiCuentaCard
      title="CUENTA EN DOLARES"
      description="Mira tus dolares"
      image="src/assets/catusd.jpg"
      alt="Dolares"      
      cvu= "43243242343"
      transactionLimit= "1.000"
      balance = "125"
    />
  );
}

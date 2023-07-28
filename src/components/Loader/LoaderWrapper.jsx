import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loader;
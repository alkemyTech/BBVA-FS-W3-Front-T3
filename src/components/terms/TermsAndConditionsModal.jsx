import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from '@mui/material';

const TermsAndConditionsModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle sx={{ color: "#45b5c4" }}>Términos y Condiciones</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Bienvenido/a a Mia Wallet. Antes de unirte a nuestra comunidad, te pedimos que leas atentamente los siguientes términos y condiciones:
                </Typography>

                <Typography variant="body1">
                    Mia Wallet es una plataforma diseñada para el manejo de activos digitales y pagos en línea. Al utilizar nuestros servicios, aceptas cumplir con las reglas y políticas establecidas en este documento.
                </Typography>

                <Typography variant="body1">
                    Debes ser mayor de edad y proporcionar información verídica al registrarte en Mia Wallet. Nos reservamos el derecho de suspender o cancelar cuentas que no cumplan con este requisito.
                </Typography>

                <Typography variant="body1">
                    Es responsabilidad del usuario mantener segura su cuenta y contraseña. No compartas tus credenciales con terceros y notifícanos de inmediato si sospechas de actividades sospechosas en tu cuenta.
                </Typography>

                <Typography variant="body1">
                    Está terminantemente prohibido realizar actividades ilegales o fraudulentas en Mia Wallet. Cualquier violación de estas normas resultará en la cancelación de tu cuenta y la posible acción legal correspondiente.
                </Typography>

                <Typography variant="body1">
                    Nos esforzamos por mantener la seguridad y confidencialidad de tus datos, pero no podemos garantizar la protección absoluta contra posibles amenazas cibernéticas. Te recomendamos tomar medidas adicionales para proteger tus activos digitales.
                </Typography>

                <Typography variant="body1">
                    Mia Wallet se reserva el derecho de realizar actualizaciones y mejoras en la plataforma sin previo aviso. Presta atención a las notificaciones y anuncios para estar al tanto de los cambios.
                </Typography>

                <Typography variant="body1">
                    Al utilizar Mia Wallet, aceptas que tus datos personales serán tratados de acuerdo con nuestra política de privacidad. Lee nuestra política de privacidad para obtener más información sobre cómo recopilamos, almacenamos y utilizamos tus datos.
                </Typography>

                <Typography variant="body1">
                    Estos términos y condiciones se rigen por las leyes de [País o Región]. Cualquier disputa o conflicto relacionado con Mia Wallet se resolverá de acuerdo con las leyes de [País o Región].
                </Typography>

                <Typography variant="body1">
                    Al registrarte en Mia Wallet, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguno de estos términos, te recomendamos no utilizar nuestros servicios.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: "#45b5c4" }}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TermsAndConditionsModal;

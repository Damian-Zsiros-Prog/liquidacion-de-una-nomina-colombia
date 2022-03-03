class Empresa {
    constructor(numEmpleados) {
        this.numEmpleados = numEmpleados;
        this.nominaEmpleado = {};
    }
}

let formInfoEmpleado = document.getElementById("form-info-inicial-empleado");

formInfoEmpleado.addEventListener("submit", (e) => {
    e.preventDefault();

    let SMLV = 1000000;

    let dataForm = new FormData(formInfoEmpleado);
    let nombres = dataForm.get("nombres");
    let apellidos = dataForm.get("apellidos");
    let salarioBasico = Number(dataForm.get("salarioBasico"));
    let diasTrabajados = Number(dataForm.get("diasTrabajados"));
    let horasExtras = Number(dataForm.get("horasExtras"));
    let bonificaciones = Number(dataForm.get("bonificaciones"));

    let auxilioTransporte = 0;

    let sueldo = (salarioBasico / 30) * diasTrabajados;

    if (sueldo < SMLV * 2) {
        auxilioTransporte = 117712;
    } else {
        auxilioTransporte = 0;
    }

    let totalDevengado =
        sueldo + auxilioTransporte + horasExtras + bonificaciones;
    let IBC = totalDevengado - auxilioTransporte;

    let deduccionPension = IBC * 0.04;
    let deduccionSalud = IBC * 0.04;
    let totalDeducido = deduccionSalud + deduccionPension;

    let netoPagado = totalDevengado - totalDeducido;

    let nominaEmpleado = {
        infoEmpleado: {
            nombres,
            apellidos,
        },
        salarioBasico,
        diasTrabajados,
        devengado: {
            sueldo,
            auxilioTransporte,
            horasExtras,
            bonificaciones,
        },
        totalDevengado,
        IBC,
        deducido: {
            deduccionPension,
            deduccionSalud,
        },
        totalDeducido,
        netoPagado,
    };

    let nominaEmpleadoShow = document.getElementById("nominaEmpleadoShow");
    nominaEmpleadoShow.innerHTML = `
        <h2>Nomina de empleado - ${nominaEmpleado.infoEmpleado.nombres} $ ${nominaEmpleado.infoEmpleado.apellidos}</h2>
        <h3>Informacion del empleado</h3>
        <h4>Salario basico: $ ${nominaEmpleado.salarioBasico}</h4>
        <h4>Dias trabajados: ${nominaEmpleado.diasTrabajados}</h4>
        <h3>Informacion de lo devengado por el empleado</h3>
        <h4>Sueldo: $ ${nominaEmpleado.devengado.sueldo}</h4>
        <h4>Auxilio Transporte: $ ${nominaEmpleado.devengado.auxilioTransporte}</h4>
        <h4>Horas Extras: $ ${nominaEmpleado.devengado.horasExtras}</h4>
        <h4>Bonificaciones: $ ${nominaEmpleado.devengado.bonificaciones}</h4>
        <h4>Total devengado: $ ${nominaEmpleado.totalDevengado}</h4>
        <h3>Informacion de lo deducido al empleado</h3>
        <h4>Deduccion de salud: $ ${nominaEmpleado.deducido.deduccionSalud}</h4>
        <h4>Deduccion de pension: $ ${nominaEmpleado.deducido.deduccionPension}</h4>
        <h4>Total deducido: ${nominaEmpleado.totalDeducido}</h4>
        <h3>Neto pagado: $ ${nominaEmpleado.netoPagado}</h3>
    
    
    
    
    
    `;
});

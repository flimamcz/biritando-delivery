import React, { } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { requestPut } from '../services/request';

export default function StatusButton({ getOrder, currentStatus }) {
  const path = useLocation().pathname.split('/')[1];
  const { id } = useParams();

  const buttonNames = ['PREPARAR PEDIDO', 'SAIU PARA ENTREGA', 'MARCAR COMO ENTREGUE'];

  const statusNames = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

  const testIds = ['preparing', 'dispatch', 'delivery'];

  if (path === 'customer') {
    buttonNames.splice(0, 2);
    statusNames.splice(0, 2);
    testIds.splice(0, 2);
  } else {
    buttonNames.pop();
    statusNames.pop();
    testIds.pop();
  }

  const handleClick = async (newStatus) => {
    await requestPut(`/${path}/orders/${id}`, { newStatus });
    await getOrder();
  };

  const isDisabled = (buttonName) => {
    if (path === 'seller') {
      if ((currentStatus === statusNames[0] && buttonName === buttonNames[0])) {
        return false;
      } if ((currentStatus === statusNames[1] && buttonName === buttonNames[1])) {
        return false;
      } return !(currentStatus === statusNames[2] && buttonName === buttonNames[2]);
    } if (currentStatus !== statusNames[0]) {
      return true;
    }
  };

  return (
    buttonNames.map((name, i) => (
      <button
        onClick={ () => handleClick(statusNames[i + 1]) }
        disabled={ isDisabled(name) }
        type="button"
        data-testid={ `${path}_order_details__button-${testIds[i]}-check` }
        key={ i }
      >
        {name}
      </button>
    ))
  );
}

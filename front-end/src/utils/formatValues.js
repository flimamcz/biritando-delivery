import moment from 'moment/moment';

export const addZerosOnRightSide = (num) => {
  const Numberzeros = 4;
  const newNum = String(num).padStart(Numberzeros, '0');
  return newNum;
};

export const convertDate = (data) => moment(data).format('DD/MM/YYYY');

export const convertTotal = (total) => {
  const totalNumber = Number(total);
  return totalNumber.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
};

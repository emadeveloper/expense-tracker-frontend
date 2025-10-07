import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (fullName) => {
    if (!fullName) return '';

    const words = fullName.trim().split(' ');
    let initials = '';

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandSeparators = (num) => {
    if (num == null || isNaN(num)) return '';

    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return fractionalPart 
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;

};

export const prepareExpenseBarChartData = (data = []) => {
    
    return data.map(item => ({
        month: item.label ?? `${item.year}-${String(item.month).padStart(2, '0')}`,
        amount: item.totalAmount ?? 0
    }));
};

export const prepareIncomeBarData = (data =[]) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map(item => ({
        month: moment(item?.date).format('DD MMM'),
        amount: item?.amount,
        source: item?.source || 'Income'
    }));

    return chartData;
};

export const prepareExpenseLineBarData = (data = []) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return []
    }
  
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    const chartData = sortedData.map(item => ({
      date: moment(item?.date).format('DD MMM'),
      amount: item?.amount,
      category: item?.category || 'Expense'
    }));
    
    return chartData;
};

export const formatCurrency = (value) => {
    const num = Number(String(value).replace(/,/g, ''));
    if (isNaN(num)) return "-";
    return num.toLocaleString('es-AR', { minimumFractionDigits: 2 });
};
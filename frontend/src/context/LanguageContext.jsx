import { createContext, useState, useContext } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('sw'); // 'sw' or 'en'

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'sw' ? 'en' : 'sw');
  };

  const t = (key) => {
    const translations = {
      // Common
      welcome: language === 'sw' ? 'Karibu' : 'Welcome',
      login: language === 'sw' ? 'Ingia' : 'Login',
      register: language === 'sw' ? 'Jisajili' : 'Register',
      logout: language === 'sw' ? 'Toka' : 'Logout',
      
      // Register
      phone_number: language === 'sw' ? 'Namba ya Simu' : 'Phone Number',
      full_name: language === 'sw' ? 'Jina Kamili' : 'Full Name',
      pin: language === 'sw' ? 'PIN' : 'PIN',
      ncpwd_card: language === 'sw' ? 'Namba ya Kadi ya NCPWD' : 'NCPWD Card Number',
      principal: language === 'sw' ? 'Mmiliki' : 'Principal',
      caregiver: language === 'sw' ? 'Msaidizi' : 'Caregiver',
      
      // Transaction
      send_money: language === 'sw' ? 'Tuma Pesa' : 'Send Money',
      buy_airtime: language === 'sw' ? 'Nunua Airtime' : 'Buy Airtime',
      pay_bill: language === 'sw' ? 'Lipa Bill' : 'Pay Bill',
      amount: language === 'sw' ? 'Kiasi (KSh)' : 'Amount (KSh)',
      recipient_phone: language === 'sw' ? 'Namba ya Simu ya Mpokeaji' : 'Recipient Phone',
      
      // Buttons
      submit: language === 'sw' ? 'Tuma Ombi' : 'Submit Request',
      yes: language === 'sw' ? 'NDIYO' : 'YES',
      no: language === 'sw' ? 'HAPANA' : 'NO',
    };
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
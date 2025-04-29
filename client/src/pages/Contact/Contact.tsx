import React from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
    return (
        <div className={styles.contact}>
            <h1>Контакти</h1>
            <p>Свържи се с нас чрез имейл или ни последвай в социалните мрежи.</p>

            <ul>
                <li><strong>Имейл:</strong> support@assetra.com</li>
                <li><strong>Телефон:</strong> +359 88 123 4567</li>
                <li><strong>Адрес:</strong> София, бул. България </li>
            </ul>

            <p>Или използвай формата по-долу:</p>
            <form className={styles.form}>
                <input type="text" placeholder="Твоето име" required />
                <input type="email" placeholder="Имейл" required />
                <textarea placeholder="Съобщение" rows={5} required></textarea>
                <button type="submit">Изпрати</button>
            </form>
        </div>
    );
};

export default Contact;

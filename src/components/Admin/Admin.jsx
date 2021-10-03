import React ,{useState}  from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Admin = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className="calendar__container">
            <Calendar
                onChange={onChange}
                value={value}
      />
        </div>
    )
}

export default Admin

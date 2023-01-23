import { useEffect } from "react";
import NavTeacher from "../../layout/NavTeacher";

const CalendarPageTeacher = () => {
    const date = new Date();
    const date_start = new Date(2023, 0, 1)
    const date_end = new Date(2023, 0, (new Date(2023, 1, 0).getDate()))


    const dayInMonth = new Date(2023, 1, 0).getDate()
    const dayArray = [[],[],[],[],[]];

    let counter = 0
    dayArray.forEach((day, index) => {
        
        for(let i=1; i <= 7; i++) {
            if(counter == dayInMonth) break
            day.push(i);
            counter++;
            console.log(counter);
        }
  
    })

    console.log(dayArray)
    useEffect(() => {

    }, [])

    return (
        <div className="container">
            <NavTeacher />
            <div className="mt-5">
                <div className="border border-primary p-3">
                <div className="d-flex justify-content-center pb-3">{date.toLocaleString('default',{month: 'long'})}</div>
                {/* {new Date(2023, 1, 0).getDate()} */}
                {date_start.getDay()} {date_end.getDay()}
                    <table className="table text-center">
                        
                        <thead>
                            {
                                dayArray.map((day, index) => (
                                    <tr>
                                        <th scope="col"> {index}</th>
                                    </tr>
                                ))
                            }
                            
                            <tr>
                                <th scope="col"> Sunday</th>
                                <th scope="col"> Monday</th>
                                <th scope="col"> Thursday</th>
                                <th scope="col"> Wednesday</th>
                                <th scope="col"> Thursday</th>
                                <th scope="col"> Friday</th>
                                <th scope="col"> Saturday</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td className="col">1</td>
                                <td className="col">2</td>
                                <td className="col">3</td>
                                <td className="col">4</td>
                                <td className="col">5</td>
                                <td className="col ">6</td>
                                <td className="col bg-danger">7</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td >8</td>
                                <td >9</td>
                                <td >10</td>
                                <td >11</td>
                                <td >12</td>
                                <td >13</td>
                                <td >14</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td >15</td>
                                <td >16</td>
                                <td >17</td>
                                <td >18</td>
                                <td >19</td>
                                <td >20</td>
                                <td >21</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td >22</td>
                                <td >23</td>
                                <td >24</td>
                                <td >25</td>
                                <td >26</td>
                                <td >27</td>
                                <td >28</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td >29</td>
                                <td >30</td>
                                <td >31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="pt-5">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col"> 7:30 - 8:30</th>
                                <th scope="col"> 8:30 - 9:30</th>
                                <th scope="col"> 9:30 - 10:30</th>
                                <th scope="col"> 10:30 - 11:45</th>
                                <th scope="col"> 11:45 - 12:45</th>
                                <th scope="col"> 12:45 - 13:30</th>
                                <th scope="col"> 13:30 - 14:30</th>
                                <th scope="col"> 14:30 - 15:30</th>
                                <th scope="col"> 15:30 - 16:30</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td className="col">1</td>
                                <td className="col">2</td>
                                <td className="col">3</td>
                                <td className="col">4</td>
                                <td className="col">5</td>
                                <td className="col">6</td>
                                <td className="col">7</td>
                                <td className="col">8</td>
                                <td className="col">9</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default CalendarPageTeacher;
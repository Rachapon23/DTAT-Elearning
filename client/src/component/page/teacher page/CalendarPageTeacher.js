import NavTeacher from "../../layout/NavTeacher";

const CalendarPageTeacher = () => {
    
    return (
        <div className="container">
            <NavTeacher />
            <div className="mt-5">
                <div className="border border-primary p-3">
                    <table className="table text-center">
                        <thead>
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
                                <td className="col-2">1</td>
                                <td className="col-2">2</td>
                                <td className="col-2">3</td>
                                <td className="col-2">4</td>
                                <td className="col-2">5</td>
                                <td className="col-2">6</td>
                                <td className="col-2">7</td>
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
            </div>
        </div>
    );
}

export default CalendarPageTeacher;
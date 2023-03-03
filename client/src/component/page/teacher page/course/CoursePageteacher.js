import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import NavTeacher from "../../../layout/NavTeacher";
import './course.css'
import Swal from "sweetalert2";
import { Switch } from 'antd';
// import { Link } from "react-router-dom";
// import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom'
import { getCourse, removeCourse, enablecourse } from "../../../../function/teacher/funcCourse";
import ReactPlayer from "react-player";
import { duration } from 'moment';


const CoursePageteacher = () => {
    const { id } = useParams();
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState();
    const [dataQuiz, setDataQuiz] = useState([])
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const playRef = useRef(null)
    const playerContainerRef = useRef(null)

    const [videoController, setVideoController] = useState({
        playing: false,
        duration: 0.00,
        muted: false,
        volume: 0.1,
        played: 0,
    })


    const fetchCourse = () => {
        getCourse(sessionStorage.getItem("token"), id)
            .then((response) => {
                // console.log(response)
                setCourse(response.data)
                setTopic(response.data.topic)
            })
            .catch((err) => {
                console.log(err)
                Swal.fire(
                    "Alert!",
                    "Cannot fetch course data",
                    "error"
                )
            })
    }
    // console.log(id)

    useEffect(() => {
        fetchCourse()
    }, []);

    const nextToCourse = (params) => {
        console.log(params)
        navigate('/teacher/edit-course/' + params)
    }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const remove = (params) => {
        // console.log(params)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            //   cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                removeCourse(sessionStorage.getItem("token"), params)
                    .then(res => {
                        // console.log(res)
                        Toast.fire({
                            icon: 'success',
                            title: 'Your Course has been deleted successfully'
                        })

                        navigate('/teacher/list-courses')
                    }).catch(err => {
                        console.log(err)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Something went wrong!',
                        })
                    })
            }
        })

    }

    const onChangeEnable = (checked) => {
        console.log(`switch to ${checked}`);
        enablecourse(sessionStorage.getItem("token"),
            {
                id: id,
                enable: checked
            })
            .then((response) => {
                // console.log(response)
                fetchCourse()
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const handlePlayVideo = () => {
        if(videoController.playing) {
            setVideoController({playing: false})
            setVideoController({duration: playRef.current.getCurrentTime()})
        }
        else setVideoController({playing: true})
    }

    const handleForwardVideo = () => {
        playRef.current.seekTo(playRef.current.getCurrentTime() + 10)
        console.log(playRef.current.getCurrentTime())
    }

    const handleRewind = () => {
        playRef.current.seekTo(playRef.current.getCurrentTime() - 10)
    }

    const handleVideoVolume = (e) => {
        console.log(e.target.value)
        setVideoController({volume: e.target.value / 100})
    }

    const handleProcess= (e) => {
        console.log(e)
    }



    return (
        <div>
            <NavTeacher />

            <div className="container ">
                {/* {JSON.stringify(course_id)} */}
                {course &&
                    <>
                        <div className="d-flex justify-content-end mt-4">
                            <label className='form-label me-3'> Course Status </label>
                            <Switch defaultChecked={course.enabled} onChange={onChangeEnable} />
                        </div>
                        {course.image
                            ? <div className="card mt-3">
                                <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="img-size-student card-img-top" />
                                <div className="card-body">
                                    <div className="mt-3 px-2">
                                        <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                        <p className="card-text fs-6">Detail: {course.description}</p>
                                        {course.status !== "public" ?
                                            <p className="text-muted ">Teacher : {course.teacher.firstname}</p>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="card mt-3">
                                <div className="card-body alert-primary">
                                    <div className="mt-3 px-2 text-dark">
                                        <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                        <p className="card-text fs-6">Detail : {course.description}</p>
                                        {course.status !== "public" ?
                                            <p className="text-muted ">Teacher : {course.teacher.firstname}</p>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }
                <div className="border bg-white my-3 ">
                    {topic && topic.map((item, index) => (
                        <div key={index} className="px-5 mt-3">

                            <h5 id="titleTopic" className="fw-bold">{item.title}</h5>
                            <div className="">
                                <p className="fs-6">{item.description}</p>

                                {item.text.length > 0 &&
                                    <div className=""><ul>
                                        {item.text.map((ttem, tdex) =>
                                            <li className="fs-6" key={tdex}>
                                                {ttem.content}
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
                                {item.link.length > 0 &&
                                    <div className=""><ul>
                                        {item.link.map((ttem, tdex) =>
                                            ttem.url.includes("youtube.com") ?
                                            (
                                                <div className="d-flex justify-content-center">
                                                    <iframe 
                                                        width="560" 
                                                        height="315" 
                                                        src={ttem.url.replace("watch?v=","embed/")} 
                                                        title="YouTube video player" 
                                                        frameborder="0" 
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                        allowfullscreen
                                                    />
                                                </div>
                                            )
                                            :
                                            (
                                                <li key={tdex}>
                                                    <a className='text-info' href={ttem.url}><i className="bi bi-link"></i>&nbsp;{ttem.name}</a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    </div>
                                }
                                
                                {item.file &&
                                    <div className="">
                                        {item.file.map((ttem, tdex) =>

                                            <div key={tdex} className="mb-2">
                                                {ttem.filetype === 'image/jpeg'
                                                    ? <div className="container">
                                                        <div className="d-flex justify-content-center">
                                                            <div className="w-50">
                                                                <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        {ttem.filetype === 'application/pdf'
                                                            ? <div>
                                                                <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-danger size-pdf">
                                                                    <i className="bi bi-file-earmark-pdf"></i> {ttem.name}</a>
                                                            </div>
                                                            :
                                                            <>
                                                                {ttem.filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                    ? <div>
                                                                        <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-primary">
                                                                            <i className="bi bi-file-earmark-word"></i> {ttem.name}</a>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        {ttem.filetype === "image/png"
                                                                            ? <div className="container">
                                                                                <div className="d-flex justify-content-center">
                                                                                    <div className="w-50">
                                                                                        <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            : <>
                                                                                {ttem.filetype == "image/webp"
                                                                                    ? <div className="container">
                                                                                        <div className="d-flex justify-content-center">
                                                                                            <div className="w-50">
                                                                                                <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                    :

                                                                                    <>
                                                                                        <div ref={playerContainerRef} id="playerWrapper">
                                                                                            <div className="d-flex justify-content-center">
                                                                                                <ReactPlayer
                                                                                                    ref={playRef}
                                                                                                    width={"100%"}
                                                                                                    height={"100%"}
                                                                                                    url={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                    muted={videoController.muted}
                                                                                                    playing={videoController.playing}
                                                                                                    onProgress={(e) => handleProcess(e)}

                                                                                                />
                                                                                            </div>
                                                                                            
                                                                                            <div id="controlWarpper">
                                                                                                <div className="container d-flex justify-content-between">
                                                                                                    <div >
                                                                                                        <h1>Title</h1>
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div id="controlIcons" className="container d-flex justify-content-center">
                                                                                                    <button onClick={handleRewind}>back</button>
                                                                                                    <button onClick={handlePlayVideo}>play</button>
                                                                                                    <button onClick={handleForwardVideo}>Fast</button>


                                                                                                </div>

                                                                                                {/* <div className="container d-flex justify-content-between"/> */}

                                                                                                <div className="ps-4 pe-4">
                                                                                                    <input type="range" class="form-range" min="0" max="100" step="1" value={videoController.play_on}/>
                                                                                                </div>

                                                                                                <div id="buttomIcons" className="container d-flex justify-content-between">
                                                                                                    <div className='row'>
                                                                                                        <div className="col-6">
                                                                                                            <button onClick={handleRewind}>Back</button>
                                                                                                            <button onClick={handlePlayVideo}>Play</button>
                                                                                                            <button onClick={handleForwardVideo}>Fast</button>
                                                                                                        </div>
                                                                                                        <div className="col">
                                                                                                            <input type="range" class="form-range" min="0" max="100" step="1" value={videoController.volume * 100} onChange={(e) => handleVideoVolume(e)}/>
                                                                                                        </div>
                                                                                                        <div className="col">
                                                                                                            <h5>{videoController.duration}</h5>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div id="buttomIcons" className="row d-flex justify-content-end">
                                                                                                        <button>Full</button>
                                                                                                    </div>
                                                                                                </div>

                                                                                                


                                                                                            </div>
                                                                                        </div>


                                                                                        {/* {ttem.filetype == "video/mp4"
                                                                                            ? <div className="container">
                                                                                                <p>{(ttem.name).split('.')[0]}</p>
                                                                                                <div className="d-flex justify-content-center">
                                                                                                    <div className="w-50">
                                                                                                        <video className="w-100" controls>
                                                                                                            <source src={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                                type={ttem.filetype} />
                                                                                                            Your browser does not support the video tag.
                                                                                                        </video>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>
                                                                                            :
                                                                                            <>
                                                                                                {ttem.filetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                                                                                    ? <div>
                                                                                                        <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-warning">
                                                                                                            <i className="bi bi-filetype-ppt"></i> {ttem.name}</a>
                                                                                                    </div>
                                                                                                    :
                                                                                                    <>

                                                                                                        <p>Cannot read file</p>
                                                                                                    </>
                                                                                                }
                                                                                            </>
                                                                                        } */}
                                                                                    </>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                }

                                            </div>

                                        )}

                                    </div>
                                }

                                {item.quiz.length > 0 &&
                                    <div className=""><ul>
                                        {item.quiz.map((ttem, tdex) =>

                                            <li key={tdex}>
                                                <Link className="text-success" to={`/student/test/` + ttem.quiz} state={{ path: pathname }}>
                                                    <i className="bi bi-clipboard2-check"></i>&nbsp;{ttem.name}
                                                </Link>
                                            </li>

                                        )}
                                    </ul>
                                    </div>
                                }
                            </div>


                            <hr className="mt-4" />
                        </div>


                    ))}
                </div>
                <div className="d-flex justify-content-between mb-4">
                    <button onClick={() => nextToCourse(course._id)} className="btn btn-warning w-25">Edit</button>
                    <button onClick={() => remove(course._id)} className="btn btn-danger w-25">Delete</button>
                </div>


            </div>
        </div>
    );
}

export default CoursePageteacher
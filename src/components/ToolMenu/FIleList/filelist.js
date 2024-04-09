export default function FileList({data}){

    const styles = {
        position:"absolute",
        right:100,
        border:"solid",
        height:"80%",
        width:"40%",
        padding:20
    }


    return <div style={styles}>
        <video controls>
            <source src="/准备机器人工作站/video.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
    </div>
}
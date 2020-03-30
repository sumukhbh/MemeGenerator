import React from "react"

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            MemeImgs: []
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.SubmitHandler = this.SubmitHandler.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ MemeImgs: memes })
            })
    }
    
    ChangeHandler(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    SubmitHandler(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.MemeImgs.length)
        const randMemeImg = this.state.MemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.SubmitHandler}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.ChangeHandler}
                    /> 
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.ChangeHandler}
                    /> 
                
                    <button>GENERATE</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="Meme" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
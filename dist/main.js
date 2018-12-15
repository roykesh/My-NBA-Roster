class API {
    constructor() {
        this.renderer = new Renderer()
    }

    getRoster() {
        let teamQuery = $("#team-input").val()
        $.get(`/teams/${teamQuery}`, (response) => {
            console.log(response)
            this.renderer.renderRoster(response)
        })
    }
}

const api = new API()
$('#get-roster').on('click', function () {
    api.getRoster()
})
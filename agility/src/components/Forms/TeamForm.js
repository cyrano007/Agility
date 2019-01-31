import React from "react"
import PropTypes from "prop-types"
import {
  Form,
  Button,
  Icon,
  Label,
  Search,
  Dimmer,
  Loader,
  Rating,
  Header,
  Segment,
  Dropdown
} from "semantic-ui-react"
import { graphql, ApolloConsumer, compose } from "react-apollo"
import _ from "lodash"
import FetchTeams from "../../queries/fetchTeamsAsTitle"
import UpdatePersonById from "../../mutations/UpdatePersonById"
import CreateTeam from "../../mutations/CreateTeam"
import TeamCreate from "./TeamCreate"
import TeamEdit from "./TeamEdit"

class TeamForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teamOptions: [],
      teamName: "",
      existingTeam: null
    }
  }

  handleAddition = (e, { value, options }) => {
    this.setState({
      teamOptions: [{ text: value, value }, ...options]
    })
  }

  handleTeamChange = (e, { value }) => {
    const team = this.props.allTeams.allTeams.nodes.find(team => {
      return team.title === value
    })
    if (team) {
      // if team exists(update) retrieve data and fill
      this.setState({ existingTeam: team, teamName: value })
    } else {
      this.setState({
        teamName: value,
        existingTeam: null
      })
    }
    // if team doesn't exist clear fields?
  }

  onSubmit = (description, members, skills) => {
    // if team does not exist create team
    // if team exists update desc
    // update each person picked for team
    // create team skill association
  }

  renderEditOrCreate() {
    if (this.state.existingTeam) {
      return <TeamEdit selectedTeam={this.state.existingTeam} />
    } else {
      return <TeamCreate />
    }
  }

  render() {
    console.log(this.props)
    if (this.props.allTeams.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    const teamArr = this.props.allTeams.allTeams.nodes
    let teamOptions = teamArr.map(team => {
      return {
        key: team.id,
        text: team.title,
        value: team.title
      }
    })
    if (this.state.teamOptions.length > 0) {
      teamOptions = this.state.teamOptions
    }
    return (
      <div>
        <Form>
          <div>
            <Form.Field>
              <label>Search for existing team or create a new team</label>
              <Dropdown
                placeholder="Team Name"
                fluid
                selection
                search
                allowAdditions
                value={this.state.teamName}
                options={teamOptions}
                onAddItem={this.handleAddition}
                onChange={this.handleTeamChange}
              />
            </Form.Field>
          </div>
        </Form>
        {this.renderEditOrCreate()}
      </div>
    )
  }
}

export default compose(graphql(FetchTeams, { name: "allTeams" }))(TeamForm)

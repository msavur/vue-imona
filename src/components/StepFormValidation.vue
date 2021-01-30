<template>
  <form-wizard @onComplete="onComplete()">
    <tab-content title="Game Information" :selected="true">
      <div class="form-group">
        <label for="name">Name</label>
        <input
            id="name"
            type="text"
            class="form-control"
            :class="hasError('name') ? 'is-invalid' : ''"
            placeholder="Enter your name"
            v-model="formData.name">
        <div v-if="hasError('name')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.name.required">Please provide a valid name.</div>
        </div>
      </div>
      <div class="form-group">
        <label for="description">description</label>
        <input
            id="description"
            type="text"
            class="form-control"
            :class="hasError('description') ? 'is-invalid' : ''"
            placeholder="Enter your description"
            v-model="formData.description">
        <div v-if="hasError('description')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.description.required">Description field is required</div>
        </div>
      </div>
      <div class="form-group">
        <label for="logo">Logo </label>
        <br/>
        <input id="logo" type="file" :class="hasError('logo') ? 'is-invalid' : ''" @change="onFileChanged">
        <div v-if="hasError('logo')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.logo.required">Logo field is required</div>
        </div>
      </div>
    </tab-content>
    <tab-content title="List of Players">
      <div class="form-group">
        <label for="players">Select Player</label>
        <select
            id="players"
            :class="hasError('playerId') ? 'is-invalid' : ''"
            class="form-control"
            v-model="formData.playerId">
          <option v-for="player in players" :key="player.id" v-bind:value="player.id">{{ player.name }}
            {{ player.surname }}
          </option>
        </select>
        <div v-if="hasError('playerId')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.playerId.required">Please select on of the fields.</div>
        </div>
      </div>

      <div v-if="isSaveButton">
        <hr/>
        <h1>Player Form</h1>
        <div class="form-group">
          <label for="playerName">Name</label>
          <input
              id="playerName"
              type="text"
              class="form-control"
              :class="hasError('playerName') ? 'is-invalid' : ''"
              placeholder="Player name"
              v-model="formData.playerName"
          >
          <div v-if="hasError('playerName')" class="invalid-feedback">
            <div
                class="error"
                v-if="!$v.formData.playerName.required">Please provide a valid player name.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="surname">Surname</label>
          <input
              id="surname"
              type="text"
              class="form-control"
              :class="hasError('surname') ? 'is-invalid' : ''"
              placeholder="Enter Surname"
              v-model="formData.surname"
          >
          <div v-if="hasError('surname')" class="invalid-feedback">
            <div
                class="error"
                v-if="!$v.formData.surname.required"
            >Please provide a valid surname.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select
              id="gender"
              :class="hasError('gender') ? 'is-invalid' : ''"
              class="form-control"
              v-model="formData.gender">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <div v-if="hasError('gender')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.gender.required">Please select on of the fields.</div>
          </div>
        </div>
        <div class="form-group">
          <label for="birthDate">Birth date</label>
          <input
              id="birthDate"
              type="date"
              class="form-control"
              :class="hasError('birthDate') ? 'is-invalid' : ''"
              placeholder="Enter birthDate"
              v-model="formData.birthDate">
          <div v-if="hasError('birthDate')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.birthDate.required">Please select on of the fields.</div>
          </div>
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <select
              id="city"
              :class="hasError('city') ? 'is-invalid' : ''"
              class="form-control"
              v-model="formData.city">
            <option v-for="city in cities" :key="city.id" v-bind:value="city.id">{{ city.name }}</option>
          </select>
          <div v-if="hasError('city')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.city.required">Please select on of the fields.</div>
          </div>
        </div>
        <div class="form-group form-check">
          <input
              id="flag"
              type="checkbox"
              :class="hasError('flag') ? 'is-invalid' : ''"
              class="form-check-input"
              v-model="formData.flag"
          >
          <label class="form-check-label">Flag</label>
          <div v-if="hasError('flag')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.flag.required">Please select terms and conditions.</div>
          </div>
        </div>
        <div class="form-group" v-if="isSaveButton">
          <i class="material-icons" style="font-size:45px;color:green; margin-left: 380px; cursor: pointer"
             v-on:click="savePlayer()">save</i>
          <i class="material-icons" style="font-size:45px;color:red; cursor: pointer"
             v-on:click="cancelPlayer()">cancel</i>
        </div>
      </div>

      <div class="form-group" style="padding-top: 40px;">
        <div  class="alert alert-success" role="alert" v-if="isPlayerSuccess">
          The player has been successfully saved. <a href="#" v-on:click="closeMessage()" class="alert-link">Close</a>
        </div>
        <a type="button" class="btn btn-primary" v-on:click="getAllPlayers()">Show Records</a>
        <a v-if="!isSaveButton" class="btn btn-primary"  v-on:click="createPlayer()"><b>Player Create</b></a>
        <table class="table" v-if="isSyncShowRecords">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Gender</th>
            <th scope="col">Operations</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="player in players" :key="player.id">
            <td>{{ player.id }}</td>
            <td>{{ player.name }}</td>
            <td>{{ player.surname }}</td>
            <td>{{ player.gender }}</td>
            <td>
              <i class="material-icons" style="font-size:24px;color:red; cursor: pointer"
                 v-on:click="deletePlayer(player.id)">delete</i>
              <i class="material-icons" style="font-size:24px;color:blue; cursor: pointer"
                 v-on:click="editPlayer(player)">edit</i>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </tab-content>
    <tab-content title="Enter New Data Screen">
      <div class="form-group">
        <label for="actionName">Action Name</label>
        <input
            id="actionName"
            type="text"
            class="form-control"
            :class="hasError('actionName') ? 'is-invalid' : ''"
            placeholder="Player name"
            v-model="formData.actionName"
        >
        <div v-if="hasError('actionName')" class="invalid-feedback">
          <div
              class="error"
              v-if="!$v.formData.actionName.required">Please provide a valid action name.
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="actionDescription">Action Description</label>
        <input
            id="actionDescription"
            type="text"
            class="form-control"
            :class="hasError('actionDescription') ? 'is-invalid' : ''"
            placeholder="Player Description"
            v-model="formData.actionDescription"
        >
        <div v-if="hasError('actionDescription')" class="invalid-feedback">
          <div
              class="error"
              v-if="!$v.formData.actionDescription.required">Please provide a valid action description.
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="point">Action Points</label>
        <input
            id="point"
            type="number"
            class="form-control"
            :class="hasError('point') ? 'is-invalid' : ''"
            placeholder="Action Point"
            v-model="formData.point"
        >
        <div v-if="hasError('point')" class="invalid-feedback">
          <div
              class="error"
              v-if="!$v.formData.point.required">Please provide a valid action point.
          </div>
        </div>
      </div>
    </tab-content>
  </form-wizard>
</template>

<script>
import {FormWizard, TabContent, ValidationHelper} from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
import {numeric, required} from "vuelidate/lib/validators";
import {createPlayer, deletePlayer, editPlayer, getAllPlayers} from "@/service/player.service";
import {getAllCities} from "@/service/city.service";
import moment from "moment";
import {createGame} from "@/service/game.service";


export default {
  name: "StepFormValidation",
  components: {
    FormWizard,
    TabContent
  },
  mixins: [ValidationHelper],
  data() {
    return {
      formData: {
        id: null,
        name: '',
        description: '',
        logo: null,
        playerId: null,
        playerName: null,
        surname: null,
        gender: null,
        birthDate: null,
        city: null,
        flag: false,
        actionName: '',
        actionDescription: '',
        point: null
      },
      validationRules: [
        {
          name: {required},
          description: {required} // TODO savur => buraya logo gelecektir.
        },
        {
          playerId: {required}
        },
        {
          actionName: {required},
          actionDescription: {required},
          point: {required, numeric}
        }
      ],
      players: [],
      cities: [],
      isSaveButton: false,
      isSyncShowRecords: false,
      isPlayerSuccess: false
    };
  },
  methods: {
    onComplete() {
      console.log("Submitting Form : ", this.formData);
      const dto = {
        game: {
          name: this.formData.name,
          description: this.formData.description,
          logo: ''
        },
        player: {
          playerId: this.formData.playerId
        },
        action: {
          name: this.formData.actionName,
          description: this.formData.actionDescription,
          point: this.formData.point
        }
      }
      createGame(dto).then(response => {
        console.log(response);
      });
    },


    onFileChanged(event) {
      const file = event.target.files[0];
      console.log(file);
      this.formData.logo = file;
    },

    getAllPlayers() {
      getAllPlayers().then(response => {
        this.players = response.data['data']['players'];
        this.isSyncShowRecords = true;
      });
    },

    deletePlayer(id) {
      if (confirm('Are you sure you want to delete ?')) {
        deletePlayer(id).then(response => {
          console.log(response);
          this.getAllPlayers();
        });
      }
    },

    editPlayer(player) {
      this.formData.id = player.id;
      this.formData.playerName = player.name;
      this.formData.surname = player.surname;
      this.formData.birthDate = moment(player.birthDate).format('DD/MM/YYYY');
      this.formData.flag = player.flag;
      this.formData.gender = player.gender;
      this.formData.city = player.cityId;
      console.log(moment(String(player.birthDate)).format('dd-MM-yyyy'));
      this.isSaveButton = true;
    },

    createPlayer() {
      this.isSaveButton = true;
    },

    savePlayer() {
      const dto = {
        id: this.formData.id,
        name: this.formData.playerName,
        surname: this.formData.surname,
        birthDate: this.formData.birthDate,
        flag: this.formData.flag,
        gender: this.formData.gender,
        city: this.formData.city,
      }
      if (dto.id) {
        editPlayer(this.formData.id, dto).then(response => {
          console.log(response);
          this.isSaveButton = false;
          this.getAllPlayers();
          this.isPlayerSuccess = true;
        });
      } else {
        createPlayer(dto).then(response => {
          console.log(response);
          this.isSaveButton = false;
          this.getAllPlayers();
          this.isPlayerSuccess = true;
        });
      }

    },

    cancelPlayer() {
      this.isSaveButton = false;
      this.formData.id = '';
      this.formData.playerName = '';
      this.formData.surname = '';
      this.formData.birthDate = null;
      this.formData.flag = false;
      this.formData.gender = null;
      this.formData.city = null;
    },

    closeMessage(){
      this.isPlayerSuccess = false;
    }
  },

  created() {
    getAllPlayers().then(response => {
      this.players = response.data['data']['players'];
    });
    getAllCities().then(response => {
      this.cities = response.data['data']['cities'];
    });
  },


};
</script>

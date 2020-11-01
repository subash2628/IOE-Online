import React, { Component } from "react";
import Table from "../Components/Table";
import Dropdown from "../Components/common/Dropdown";
import Pagination from "../Components/common/pagination";
import Button from "@material-ui/core/Button";
import Form from "../Components/common/form";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Wallpaper from "../utils/wallpaper";

import * as firebase from "firebase/app";
import "firebase/firestore";

import { checkLocal } from "../utils/localStorage";

class HomeScreen extends Component {
  state = {
    pageSize: 8,
    currentPage: 1,
    collections: [
      "Books",
      "Courses",
      "Notes",
      "Projects",
      "QuestionPapers",
      "Softwares",
      "Syllabus",
      "Videos",
      "Extras",
    ],
    catagories: [],
    currentCatagory: null,
    formEnabled: false,
    SnackbarOpen: false,
    //SnackbarMessage: 1//here 1 is for form submit success & 0 for url copied success!
  };

  componentDidMount() {
    this.fetchData();
    //emptyLocalStorage();
    checkLocal();
    //console.log("localStrage created");
  }

  fetchData = async (_) => {
    await this.state.collections.map(async (collection) => {
      const querySnapshot = await firebase
        .firestore()
        .collection(collection)
        .get();
      const catagoryData = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        const document = { _id: doc.id, ...doc.data() };
        catagoryData.push(document);
      });
      const catagory = { name: collection, data: catagoryData };
      //return catagory;
      //catagories.push(catagory);
      this.setState((prevState) => ({
        catagories: [...prevState.catagories, catagory],
      }));
    });
    //console.log(catagories);
    //this.setState({ catagories });
  };

  fetchSpecificCatagory = async (catagoryName) => {
    const temp = [];
    const querySnapshot = await firebase
      .firestore()
      .collection(catagoryName)
      .get();
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      const document = { _id: doc.id, ...doc.data() };
      temp.push(document);
      // this.setState(prevState=> ({
      //   catagories:[...prevState.catagories , prevState.catagories[currentCatagory]]
      // }));
    });

    const tempObj = { name: catagoryName, data: temp };
    const tempCatagories = [...this.state.catagories];
    tempCatagories[this.state.currentCatagory] = tempObj;
    this.setState({ catagories: tempCatagories });
    //console.log("temp ", temp);
  };

  render() {
    const { currentPage, pageSize, catagories, currentCatagory } = this.state;
    // console.log(
    //   "catagories[currentCatagory] ",
    //   catagories[currentCatagory],
    //   "catagories ",
    //   catagories
    // );
    return (
      <div className="mt-4 d-flex flex-column ">
        <div className="d-flex flex-row">
          <div className="col-4">
            <Dropdown
              Catagories={catagories}
              onCatagoryChange={this.handleCatagoryChange}
              currentCatagory={currentCatagory}
            />
          </div>
          <div className="col-4">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                //style={{ width: 250 }}
              />
            </form>
          </div>

          <div className="col-4">
            {currentCatagory !== null && (
              <Button
                variant="outlined"
                color="primary"
                //size="large"
                onClick={this.toggleForm}
              >
                Contribute
              </Button>
            )}
          </div>
        </div>

        {currentCatagory !== null && (
          <Table
            catagory={catagories[currentCatagory]}
            //onLike={this.handleLike}
            toogleSnackbar={this.toggleSnackbar}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}

        {currentCatagory !== null && (
          <Pagination
            itemsCount={catagories[currentCatagory].data.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        )}

        {currentCatagory !== null && (
          <Form
            enabled={this.state.formEnabled}
            onSubmit={this.handleFormSubmit}
            toggle={this.toggleForm}
            currentCatagory={catagories[currentCatagory].name}
          />
        )}

        {currentCatagory === null && <Wallpaper height={600} />}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.SnackbarOpen}
          onClose={this.toggleSnackbar}
          // message={
          //   !this.state.formEnabled
          //     ? "URL copied to clipboard!"
          //     : "Resource added successfully!"
          // }
          autoHideDuration={3000}
          //className={!this.state.formEnabled ? "bg-info" : "bg-success"}
          //key={}
        >
          <Alert
            onClose={this.toggleSnackbar}
            severity={!this.state.formEnabled ? "info" : "success"}
            elevation={6}
            variant="filled"
          >
            {!this.state.formEnabled
              ? "URL copied to clipboard!"
              : "Resource added successfully!"}
          </Alert>
        </Snackbar>
      </div>
    );
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleCatagoryChange = (catagoryId) => {
    //console.log(catagoryId);
    this.setState({ currentCatagory: catagoryId });
  };
  handleFormSubmit = async ({ title, link, clearDataAfterFormSubmit }) => {
    //console.log(title, link);
    this.setState((prevState) => ({
      SnackbarOpen: !prevState.SnackbarOpen,
    }));
    setTimeout(this.toggleForm, 3000);

    //adding data to cloud
    const data = {
      Title: title,
      Link: link,
      Likes: 0,
      Views: 0,
    };

    // Add a new document in collection "cities" with ID 'LA'
    const res = await firebase
      .firestore()
      .collection(this.state.catagories[this.state.currentCatagory].name)

      .add(data);
    //console.log(res);
    if (res) {
      this.fetchSpecificCatagory(
        this.state.catagories[this.state.currentCatagory].name
      );
      clearDataAfterFormSubmit();
    }
  };

  toggleForm = (_) => {
    this.setState((prevState) => ({
      formEnabled: !prevState.formEnabled,
    }));
  };

  /* //handleLike = (_) => {
  //   this.setState((prevState) => ({
  //     liked: !prevState.liked,
  //   }));
  // }; */
  toggleSnackbar = (_) => {
    this.setState((prevState) => ({
      SnackbarOpen: !prevState.SnackbarOpen,
    }));
  };
}

export default HomeScreen;

# **StopWatchApp**

### Converted javascript stopwatch to a newer framework called Vue.

> #### Since I used Vue, the buttons and portions of the app are reuseable, and easy to plug and play with 3 lines of code.<br><h4>What this entails is placing the component into the parent compnents HTML, importing the component in, and registering the component in the script that could be exported itself.</h4>

<!-- Time it took to learn vue, convert pure javscript to vue, learn vuex, learn firebase, and host project was 3 and half months. -->
<br>

#### I added new features, state managment(vuex), and a backend powered by firebase.

#

### Users and their data is scalable.

All of the user specific data is ordered from oldest to newest using firestores timestamp feature.

### The stopwatch displays all of CRUD.

> **C** - You can add laps to your user's data.<br> **R** - It reads the data specific to user after sucessful authentication.<br> **U** - You can edit the individual lap while in edit mode.<br> **D** - You can individually quick delete by clicking on red x icon, or select many and select all. (bulk delete pending)<br>

One of the pitfalls of my project is that firebase can only delete one item at a time. I had considered placing a loop in my code to pass to it one at a time, but this would slow down performance. So instead I got creative, and saw that firebase offered cloud functions. I thought if firebases servers could handle all of the work it would increase the speed of my app. The cloud functions are written in javascript. They are callable on submit event.

### Performance Stats(pending)

<!-- Total number of calls for each aspect --- cost per call 1k, 10k, 100k -->

#### The create, update, and delete show instantly on screen.

#### I was able to accomplish this with array methods, state managment, and the reactivity of vue.

Authentication is a simple email and password auth.

### Style

I worked directly with a product designer on the style, but was able give my input every step of the way.<br>
The design is dynamic using flexbox, and grid for my layout.

# **Vision**

The vision of the project was to expand on my knowledge base. I was able to get a feel for a real life project, by working with a designer and getting help when needed from my mentor. I was able to implement awesome tools such as a state managment vuex, and a lighting fast database that really is a one stop shop for all backend needs.

I ran into issues when trying to update my document because I needed the unique document ID attached somehow to my v-for as a unique id. That way when I was ready to delete or update it would make that process easier. I was able to do that with some fancy getter magic that used the the data it was getting from firebase, and arrow functions to find the store lap id that matched up with the item I had selected to either delete or update.

<!-- map it! -->

Another issue I ran into was getting user specific data. I was able to get data by placing my dispatch inside of my login to get data specific to user ID by passing the UID to that action. I was able to set up a path that grabbed only that users laps. I ran into another issue with enrollment. How would I create collections specific to user? I was able to accomplish this by using setDoc which would allow you to specify the document ID, and I passed the uid to that document ID so that I could set and find that users data. The structure of my firestore is shown in the image below.**(image pending)**
<br><br>

```

```

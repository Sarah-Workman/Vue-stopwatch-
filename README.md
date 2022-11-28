# **StopWatchApp**

# **Vision**

The vision of the project was to expand on my knowledge base. I was able to get a feel for a real life project, by working with a designer and getting help when needed from my mentor. I got the opportunity to implement some awesome tools such as a state managment vuex, and a lighting fast database that really is a one stop shop for all backend needs.

<video id="appPreview" height="500" width="500" autoplay><source src="previewVideo.mp4" type="video/mp4"></video>

## Issues

**Issue # 1**<br> I ran into a problem trying to update my document. I needed the unique document ID attached somehow to my v-for as a unique id. That way when I was ready to delete or update it would make that process easier.
I was able to do that with some fancy getter magic that used the data it was getting from firebase to find the store lap id that matched up with the item I had selected to either delete or update.

<!-- map it! -->

**Issue #2** <br>Another issue I ran into was getting user specific data. I didn't quite understand how the paths worked in firebase at first. Some steps I took was were placing my dispatch inside of my login to get data specific to user ID by passing the UID to my getData() action. I was able to set up a path after some research that grabbed only that user's laps.

**Issue #3** Shortly after resolving issue #2 I ran into another issue with enrollment. How would I create collections specific to user? I was able to accomplish this by using setDoc which allows you to specify the document ID, and I passed the uid to that document ID so that I could set and find that users data. The structure of my firestore is shown in the image below.**(image pending)**

**Issue #3** <br>I could not pass an array to the deleteDoc method. I had considered using a for loop to pass this inromation on at a time to the function, but my mentore pointed out that it would cost me in performance. So instead of passing it one at a time I got creative, and saw that firebase offered cloud functions. Using a cloud function to instead of my own would not cost me in proformance. The cloud functions are written in javascript. They are callable on submit event.
<br>

# **Vue**

### I converted my original stopwatch that was written in javascript to a newer framework called Vue.

<u>**Benefits of Vue**</u></UL>

<ul>
 <li>The buttons and portions of the app are reuseable</li>
 <li>Easy to plug and play with only 3 lines of code</li>
 <li>Reactivity that makes real time easier</li>
 </ul><br>

<!-- Time it took to learn vue, convert pure javscript to vue, learn vuex, learn firebase, and host project was 3 and half months. -->
<br>

### **Improvements to the original app**

#### I added new features, state managment(vuex), and a backend powered by firebase.

**<u>New Features!</u>**

<ul>
<li>Log in for indvidually stored data</li>
<li>Enroll for new users
<li>Individual Edit</li>
<li>Indivudual Delete</li>
<li>Ability to delete some by selecting lap</li>
<li>Ability to delete all with a total of 2 clicks!</li>
</ul>

**All features that manipulate data updates in real time**

> #### I was able to accomplish this with array methods, state managment, and the reactivity of vue.

### **Users and their data is scalable.**

All of the user specific data is ordered from oldest to newest using firestores timestamp feature.

### **The stopwatch displays all of CRUD.**

> **C** - You can add laps to your user's data.<br> **R** - It reads the data specific to user after sucessful authentication.<br> **U** - You can edit the individual lap while in edit mode.<br> **D** - You can individually quick delete by clicking on red x icon, or select many and select all. <br>

### Performance Stats(pending)

<!-- Total number of calls for each aspect --- cost per call 1k, 10k, 100k -->

### **Authentication**

Authentication is a simple email and password auth.

### **Style**

I worked directly with a product designer on the style, but was able give my input every step of the way.<br>
The design is dynamic using flexbox, and grid for my layout.

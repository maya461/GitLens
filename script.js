async function findUser() {
    var username = document.getElementById("username").value;
    var profileDiv = document.getElementById("profile");
  
    if (username === "") {
      profileDiv.innerHTML = "<p>Please type a username!</p>";
      return;
    }
  
    profileDiv.innerHTML = "<p>Loading...</p>";
  
    try {
      var response = await fetch("https://api.github.com/users/" + username);
      if (!response.ok) {
        throw new Error("User not found");
      }
      var data = await response.json();
         // Parsing the json response into a js object.
      var name = data.name ? data.name : data.login;
      var bio = data.bio ? data.bio : "No bio available";
  
      var html = '<img src="' + data.avatar_url + '" alt="avatar" />' +
                 '<h2>' + name + '</h2>' +
                 '<p>' + bio + '</p>' +
                 '<p><strong>Public Repos:</strong> ' + data.public_repos + '</p>' +
                 '<p><strong>Followers:</strong> ' + data.followers + 
                 ' | <strong>Following:</strong> ' + data.following + '</p>' +
                 '<a href="' + data.html_url + '" target="_blank">View Profile</a>';
  
      profileDiv.innerHTML = html;
    } catch (error) {
      profileDiv.innerHTML = "<p>User not found, please try again.</p>";
    }
  }
  
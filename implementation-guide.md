# Implementation Guide for Game Features

This document outlines the steps required to implement the requested features in the game. The implementation is divided into parts to ensure a structured and manageable process.

---

## Part 1: Playable Investigation

### Objective:
Enable players to interact with objects in the room to investigate and find clues.

### Steps:
1. **Identify Interactive Objects**:
   - Use the `searchableObjects` array in [`script.js`](script.js) to define all objects that can be investigated.
   - Ensure each object has a `data-name` attribute for identification.

2. **Randomly Assign Clues**:
   - Use the `prepareCase` function in [`script.js`](script.js) to shuffle and assign clues to six random objects.
   - Ensure the `gameState.clueMap` is updated with the selected objects and their corresponding clues.

3. **Handle Object Interaction**:
   - Use the `investigateObject` function in [`script.js`](script.js) to handle object clicks.
   - Display a popup with the clue text if the object contains a clue.
   - Display a neutral message if the object does not contain a clue.

---

## Part 2: Characters Within the Setting

### Objective:
Allow players to interact with characters in the room and receive progressive dialogue.

### Steps:
1. **Define Characters**:
   - Use the `characters` NodeList in [`script.js`](script.js) to identify all characters.
   - Ensure each character has a `data-name` attribute for identification.

2. **Progressive Dialogue**:
   - Use the `getCharacterDialogue` function in [`script.js`](script.js) to retrieve dialogue based on the number of clues found.
   - Update the dialogue arrays (`pandaDialogues`, `childDialogues`, `dogDialogues`) in [`script.js`](script.js) to reflect the desired progression.

3. **Handle Character Interaction**:
   - Add event listeners to characters to display their dialogue in a popup when clicked.
   - Ensure the Panda character offers the option to accuse the culprit once all clues are found.

---

## Part 3: Progressive Dialogue

### Objective:
Ensure dialogue evolves as the player discovers more clues.

### Steps:
1. **Update Dialogue Arrays**:
   - Modify the `pandaDialogues`, `childDialogues`, and `dogDialogues` arrays in [`script.js`](script.js) to include meaningful and progressive hints.

2. **Integrate Dialogue with Clue Progress**:
   - Use the `gameState.foundClues.size` to determine the current progress and select the appropriate dialogue.

3. **Test Dialogue Flow**:
   - Verify that dialogue updates correctly as clues are found and that it aligns with the investigation's progress.

---

## Part 4: Randomly Distributed Clues

### Objective:
Ensure clues are randomly distributed among objects at the start of each game.

### Steps:
1. **Shuffle Objects and Clues**:
   - Use the `shuffle` function in [`script.js`](script.js) to randomize the order of objects and clues.

2. **Assign Clues to Objects**:
   - Use the `prepareCase` function in [`script.js`](script.js) to map six random clues to six random objects.

3. **Reset Game State**:
   - Clear the `gameState.clueMap` and `gameState.foundClues` at the start of each game.

---

## Part 5: Objects (With or Without Clues)

### Objective:
Differentiate between objects that contain clues and those that do not.

### Steps:
1. **Define Neutral Texts**:
   - Use the `neutralTexts` object in [`script.js`](script.js) to define messages for objects without clues.

2. **Handle Object Investigation**:
   - Update the `investigateObject` function in [`script.js`](script.js) to display neutral texts for objects without clues.

3. **Test Object Interaction**:
   - Verify that objects with clues display the correct clue text and objects without clues display the appropriate neutral message.

---

## Part 6: Selecting the Culprit

### Objective:
Allow players to select the culprit based on the clues they have found.

### Steps:
1. **Offer Accusation Option**:
   - Use the `showJudgmentOffer` function in [`script.js`](script.js) to display the option to accuse the culprit once all clues are found.

2. **Handle Accusation**:
   - Use the `showAccusation` function in [`script.js`](script.js) to display a popup with the list of suspects.
   - Use the `judgeAccusation` function in [`script.js`](script.js) to determine if the accusation is correct.

3. **Test Accusation Flow**:
   - Verify that the game correctly identifies the culprit and displays the appropriate outcome.

---

## Part 7: Outcomes (Victory, Defeat, and Restart)

### Objective:
Implement end-game scenarios for victory, defeat, and restarting the game.

### Steps:
1. **Victory and Defeat Screens**:
   - Use the `showEndScreen` function in [`script.js`](script.js) to display the appropriate message and options based on the accusation result.

2. **Restart Game**:
   - Use the `restartGame` function in [`script.js`](script.js) to reset the game state and start a new investigation.

3. **Close Game**:
   - Use the `closeGame` function in [`script.js`](script.js) to display a message indicating the game has ended.

4. **Test End-Game Scenarios**:
   - Verify that the victory and defeat screens display correctly and that the game can be restarted.

---

## Part 8: Testing and Debugging

### Objective:
Ensure all features work as intended and fix any issues.

### Steps:
1. **Test Each Feature**:
   - Test object interaction, character dialogue, clue distribution, accusation, and outcomes.

2. **Debug Issues**:
   - Use the browser's developer tools to identify and fix any errors in the code.

3. **Optimize Performance**:
   - Ensure the game runs smoothly and efficiently.

---

## Conclusion

Follow these steps to implement the requested features in the game. Test thoroughly to ensure a seamless and enjoyable player experience.
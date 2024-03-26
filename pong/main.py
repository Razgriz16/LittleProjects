from ursina import *
import random

app = Ursina()

# Create the playing field
field = Entity(model='quad', scale=(20, 10), color=color.black, position=(0, 0))

# Create the paddles
paddle_left = Entity(model='quad', scale=(.1, 2), color=color.white, position=(-5.55, 0), collider="box")
paddle_right = Entity(model='quad', scale=(.1, 2), color=color.white, position=(5.55, 0), collider="box")

# Create the ball
ball = Entity(model='sphere', scale=0.5, color=color.white, position=(0, 0), collider="box")
ball.dx = 0.1
ball.dy = 0.1

# Player scores
player_left_score = 0
player_right_score = 0

# Score display
score = Text(text='0 - 0', scale=2, position=(0, 0.5))

# Update function
def update():
    global player_left_score, player_right_score

    # Move the ball
    ball.x += ball.dx
    ball.y += ball.dy
    hit=ball.intersects()
    if hit.hit:
        ball.dx=-1.1*ball.dx

    # Bounce the ball off the top and bottom
    if ball.y > 4:
        ball.dy *= -1
    if ball.y < -4:
        ball.dy *= -1

    # Reset the ball and update scores
    if ball.x < -10:
        player_right_score += 1
        ball.position = (0, 0)
        ball.dx = 0.1
        ball.dy = 0.1

    if ball.x > 10:
        player_left_score += 1
        ball.position = (0, 0)
        ball.dx = 0.1
        ball.dy = 0.1

    # Update the score display  
    score.text = f'{player_left_score} - {player_right_score}'

# Input handling
def input(key):
    if key == 'up arrow':
        paddle_right.y += 1
    if key == 'down arrow':
        paddle_right.y -= 1
    if key == 'w':
        paddle_left.y += 1
    if key == 's':
        paddle_left.y -= 1

app.run()

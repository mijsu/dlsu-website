
        const images = [
            "images/bgslideshow1.png",
            "images/bgslideshow2.png",
            "images/bgslideshow3.png",
            "images/bgslideshow4.png",
            "images/bgslideshow5.png",
        ];

        let currentImageIndex = 0;
        const heroSection = document.getElementById("hero");

        function changeBackground() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
        }

        setInterval(changeBackground, 4000);


    const canvas = document.getElementById("canvas-bg");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let squares = [];

    class Square {
        constructor(x, y, size, speed, angle, rotationSpeed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = speed;
            this.angle = angle;
            this.rotationSpeed = rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.strokeStyle = "rgba(9, 128, 15, 0.73)"; // White outline
            ctx.lineWidth = 2;
            ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }

        update() {
            this.y -= this.speed; // Move UP slowly
            this.angle += this.rotationSpeed; // Rotate

            if (this.y < -this.size) { // If square moves off-screen at the top
                this.y = canvas.height + this.size; // Respawn at the bottom
                this.x = Math.random() * canvas.width;
            }
        }
    }

    function initSquares() {
        squares = [];
        for (let i = 0; i < 20; i++) {
            let size = Math.random() * 40 + 20; // Square size
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let speed = Math.random() * 1 + 0.5; // **Slower speed (0.5 - 1.5)**
            let angle = Math.random() * Math.PI * 2;
            let rotationSpeed = (Math.random() - 0.5) * 0.01; // **Slower rotation**
            squares.push(new Square(x, y, size, speed, angle, rotationSpeed));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        squares.forEach((square) => {
            square.update();
            square.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initSquares();
    });

    initSquares();
    animate();

    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("hero-modal");
        const closeModal = document.getElementById("close-hero");
    
        function openModal() {
            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden"; // Disable scroll
        }
    
        function closeModalFunc() {
            modal.classList.add("hidden");
            document.body.style.overflow = "auto"; // Enable scroll again
        }
    
        // Open modal after 1 second (for testing)
        setTimeout(openModal, 5000);
    
        // Close modal when clicking outside of it
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModalFunc();
            }
        });
    });
    
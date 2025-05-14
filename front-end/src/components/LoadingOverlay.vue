<template>
    <div class="overlay">
        <div class="loader-container">
            <p class="loadingText">Loading...</p>
            <div class="loadbar">
                <div class="shimmer" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingOverlay'
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    background-color: rgba(31, 41, 55, 0.85);
    /* Tailwind gray-800 @ 85% */
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loadingText {
    font-size: 28px;
    color: #ffffff;
    font-weight: 500;
    margin-bottom: 16px;
}

.loadbar {
    width: 180px;
    height: 4px;
    background-color: #1e293b;
    /* dark gray */
    border-radius: 2px;
    margin-top: 16px;
    position: relative;
    overflow: hidden;
}

.shimmer {
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: #3b82f6;
    /* blue-500 */
    animation: side2side 2s ease-in-out infinite;
    border-radius: 1px;
}

@keyframes side2side {

    0%,
    100% {
        transform: translateX(-50%);
    }

    50% {
        transform: translateX(150%);
    }
}
</style>
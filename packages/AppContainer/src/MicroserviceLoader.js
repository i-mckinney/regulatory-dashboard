import React, { useEffect } from "react"
import PropTypes from "prop-types"

const MicroserviceLoader = ({ name, host, history }) => {
  useEffect(() => {
    console.log(`name: ${name}`)
    const scriptId = `regulatory-frontend-script-${name}`
    const renderMicroservice = () => {
      return (
        window[`render${name}`] &&
        window[`render${name}`](`${name}-container`, history)
      )
    }

    if (document.getElementById(scriptId)) {
      renderMicroservice()
      return
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const promises = Object.keys(manifest.files)
          .filter((key) => key.endsWith(".js"))
          .reduce((sum, key) => {
            sum.push(
              new Promise((resolve) => {
                const path = `${host}${manifest.files[key]}`
                const script = document.createElement("script")
                if (key === "main.js") {
                  script.id = scriptId
                }
                script.onload = () => {
                  resolve()
                }
                script.src = path
                document.body.after(script)
              })
            )
            return sum
          }, [])
        Promise.allSettled(promises).then(() => {
          renderMicroservice()
        })
      })

    console.log("DEBUG: ", window[`unmount${name}`])
    return () => {
      return (
        window[`unmount${name}`] &&
        window[`unmount${name}`](`${name}-container`)
      )
    }
  }, [name, host, history])

  return <main id={`${name}-container`} />
}

MicroserviceLoader.propTypes = {
  name: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default MicroserviceLoader

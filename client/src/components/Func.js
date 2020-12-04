import React from 'react'

const Func = ({func}) => {
    return (
        <div>
        {func !== null ? 
        <div>
            As a  <strong> {func.label}</strong> he did :
            {func.activities.map(act => 
            <ul>
                <li> {act.label} {act.versions.map(ver => <ul>
                    <li>({ver.timespan}) in {ver.location} <strong> According to : ({ver.source.livre}, p: {ver.source.page})</strong></li>
                </ul>)}  </li>
            </ul>
            
            )}
        </div> 
        : 
        <div>Loading groups...</div>}
    </div>
    )
}

export default Func

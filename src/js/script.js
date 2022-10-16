
        var data = [
            [3, 2, 1, 0],
            [],
            []
        ]
        var blockSelected = undefined
        var towerSelected = undefined

        function towerClicked(index){
            if (blockSelected == undefined){
                if (data[index].length > 0){
                    // select the block on top
                    blockSelected = data[index][data[index].length - 1]
                    towerSelected = index
                    console.log('Block', blockSelected, 'selected from tower' + (index+1))
                }
            } else {
                if (data[index].length == 0){
                    // place the block on the target tower
                    data[index] = [data[towerSelected].pop()]
                } else if (data[index][data[index].length - 1] > blockSelected){
                    // place the block on the top of the target tower
                    data[index].push(data[towerSelected].pop())
                }
                console.log('Block', blockSelected, 'dropped on tower' + (index+1))
                blockSelected = undefined
                towerSelected = undefined
            }
            updateUI()
        }

        function updateUI(){
            // clears and updates the ui
    
            for (let index=0; index<3; index++){
                towers[index].innerHTML = ""
                
                // highlight selected pole
                if (towerSelected == index){
                    towers[index].classList.add('selected')
                } else {
                    towers[index].classList.remove('selected')
                }

                // populate towers with blocks
                for (var block of data[index]) {
                    element = document.createElement('div')
                    element.classList.add('block'+(block+1))
                    element.classList.add('block')
                    towers[index].appendChild(element)
                }

                // add draggable properties to top block
                if (data[index].length > 0){
                    towers[index].childNodes[towers[index].childNodes.length-1].draggable = true
                    towers[index].childNodes[towers[index].childNodes.length-1].ondragstart = (event) => {
                        dragHandler(index, event)
                    }
                }
            }
        }

        function dragHandler(tower, event){
            console.log('dragging from', tower)
            towerSelected = tower
            blockSelected = data[tower][data[tower].length - 1]
        }

        function dropHandler(tower, event){
            // console.log('dragged to', tower)
            towerClicked(tower)
            return false
        }

        function dragOverHandler(event){
            event.preventDefault()
        }
